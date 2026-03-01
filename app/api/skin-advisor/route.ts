import { NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
    try {
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            return NextResponse.json({
                error: 'Google Gemini API key is missing. Please add GOOGLE_GEMINI_API_KEY to your .env.local file.',
                response: 'I am currently offline because my AI brain (Gemini API key) is missing. Please add your free key from Google AI Studio to wake me up!'
            }, { status: 400 });
        }

        const { mode, skinType, concern, budget, message, userId } = await req.json();

        // 1. Fetch products from database
        const { data: products, error: productsError } = await supabase
            .from('products')
            .select('*');

        if (productsError) throw productsError;

        // 2. Prepare the product context
        const productContext = products.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            subcategory: p.subcategory,
            description: p.description,
            ingredients: p.ingredients,
            skin_type: p.skin_type,
            price: p.price
        }));

        let systemPrompt = `You are a professional Skin Advisor for 'Chame', a premium skincare and makeup brand. 
        You must ONLY recommend products from the provided list. Do not imagine or suggest products that are not in the list.
        
        Available Products:
        ${JSON.stringify(productContext)}
        
        User context:
        - Target Skin Type: ${skinType || 'Not specified'}
        - Target Concern: ${concern || 'Not specified'}
        - Budget Range: ${budget || 'Not specified'}
        
        If mode is 'guided':
        Return a JSON response with:
        - recommendations: Array of product objects (id, name, explanation)
        - morningRoutine: Array of steps
        - nightRoutine: Array of steps
        
        If mode is 'chat':
        Return a JSON response with:
        - response: Your conversational response analyzing their concerns and suggesting products.
        - recommendations: Array of product IDs mentioned.
        - routine: Suggested routine (optional).
        
        RESPONSE FORMAT: You MUST return strictly valid JSON. No markdown formatting, just the raw JSON object.`;

        const userPrompt = mode === 'guided'
            ? `Provide guided recommendations for skin type ${skinType}, concern ${concern}, within budget ${budget}.`
            : `User Message: ${message}`;

        // 3. Initialize Gemini
        const model = getGeminiModel("gemini-2.5-flash-lite");
        if (!model) throw new Error("Could not initialize Gemini model.");

        let result;
        try {
            result = await model.generateContent([systemPrompt, userPrompt]);
        } catch (genError: any) {
            if (genError.status === 429) {
                return NextResponse.json({
                    error: 'Gemini Quota Exceeded',
                    response: 'I am taking a quick break! (Google Gemini Quota Exceeded). This usually happens on completely new Google projects. Please wait a few minutes or check your Google AI Studio dashboard for quota limits.'
                }, { status: 429 });
            }
            throw genError;
        }

        const responseText = result.response.text();

        // Gemini might wrap JSON in markdown blocks, we need to clean it
        const cleanJson = responseText.replace(/```json|```/g, '').trim();
        const aiResponse = JSON.parse(cleanJson || '{}');

        // 4. Log to AI_Chat_Logs if in chat mode
        if (mode === 'chat') {
            await supabase.from('ai_chat_logs').insert({
                user_id: userId || null,
                user_message: message,
                ai_response: aiResponse.response,
                recommended_products: aiResponse.recommendations
            });
        }

        return NextResponse.json(aiResponse);

    } catch (error: any) {
        console.error('AI Advisor Error:', error);
        if (error.cause) console.error('Caused by:', error.cause);
        return NextResponse.json({
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            cause: error.cause?.message || error.cause
        }, { status: 500 });
    }
}
