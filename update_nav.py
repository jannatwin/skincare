import os

filepath = r"d:\skincare\components\features\Navbar.tsx"
with open(filepath, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_nav = """                        {/* Unified Shop Megamenu */}
                        <div className="relative group">
                            <Link href="/shop" className={`${navLinkStyles} flex items-center`}>
                                Shop
                                <ChevronDown className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform" />
                                <span className={underlineStyles}></span>
                            </Link>
                            
                            {/* Desktop Megamenu Dropdown */}
                            <div className="fixed left-0 right-0 top-20 bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50 border-t border-lavender-light">
                                <div className="container mx-auto px-4 py-8 max-w-7xl">
                                    <div className="grid grid-cols-12 gap-6">
                                        
                                        {/* Column 1: Skincare Categories */}
                                        <div className="col-span-2">
                                            <h3 className="font-serif font-bold text-lg text-gray-800 mb-4 border-b border-lavender-light pb-2">Skincare</h3>
                                            <ul className="space-y-3">
                                                <li>
                                                    <Link href="/shop?category=skincare&subcategory=Cleanser" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Droplet className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Cleansers
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=skincare&subcategory=Serum" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Sparkles className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Toners & Serums
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=skincare&subcategory=Moisturizer" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Cloud className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Moisturizers
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=skincare&subcategory=Sunscreen" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Sun className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Sunscreens
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Column 2: Skin Concerns */}
                                        <div className="col-span-2">
                                            <h3 className="font-serif font-bold text-lg text-gray-800 mb-4 border-b border-lavender-light pb-2">Concerns</h3>
                                            <ul className="space-y-3">
                                                <li>
                                                    <Link href="/shop?category=skincare" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <ShieldCheck className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Acne
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=skincare" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Clock className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Anti-Aging
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=skincare" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Droplet className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Dryness
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=skincare" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Zap className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Dullness
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Column 3: Face Makeup */}
                                        <div className="col-span-2">
                                            <h3 className="font-serif font-bold text-lg text-gray-800 mb-4 border-b border-lavender-light pb-2">Face Makeup</h3>
                                            <ul className="space-y-3">
                                                <li>
                                                    <Link href="/shop?category=makeup&subcategory=Foundation" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Palette className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Foundations
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=makeup&subcategory=Concealer" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Palette className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Concealers
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=makeup&subcategory=Blush" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Sun className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Blush & Bronzer
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=makeup" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Wind className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Setting Powders
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Column 4: Eye & Lip */}
                                        <div className="col-span-2">
                                            <h3 className="font-serif font-bold text-lg text-gray-800 mb-4 border-b border-lavender-light pb-2">Eyes & Lips</h3>
                                            <ul className="space-y-3">
                                                <li>
                                                    <Link href="/shop?category=makeup" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Eye className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Mascara & Eyeliner
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=makeup" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Sparkles className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Eyeshadows
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop?category=makeup&subcategory=Lipstick" className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors group/link">
                                                        <Heart className="w-4 h-4 mr-2 text-gray-400 group-hover/link:text-primary transition-colors" />
                                                        Lipsticks
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/shop" className="flex items-center text-sm text-primary font-medium hover:text-primary/80 transition-colors group/link mt-2">
                                                        View All Details &rarr;
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        
                                        {/* Column 5: Featured Product */}
                                        <div className="col-span-4 pl-4 border-l border-lavender-light">
                                            <Link href="/shop/radiance-glow-serum" className="block relative h-64 rounded-large overflow-hidden group/promo cursor-pointer shadow-md">
                                                <div className="absolute inset-0 bg-lavender-pale"></div>
                                                <img 
                                                    src="https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800"
                                                    alt="Featured Skincare Product" 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-105"
                                                    crossOrigin="anonymous"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                                <div className="absolute bottom-0 left-0 p-6">
                                                    <span className="inline-block px-3 py-1 bg-rosegold text-white text-xs font-bold uppercase tracking-wider rounded-full mb-2">Bestseller</span>
                                                    <h4 className="text-white text-2xl font-serif font-bold mb-2">Radiance Glow Serum</h4>
                                                    <p className="text-white/90 text-sm mb-4 line-clamp-2">Discover our top-rated Vitamin C serum for bright, even skin.</p>
                                                    <span className="inline-flex items-center text-white font-semibold underline decoration-2 underline-offset-4 hover:text-primary transition-colors">
                                                        Shop Now &rarr;
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
"""

final_content = "".join(lines[:60]) + new_nav + "".join(lines[265:])

with open(filepath, "w", encoding="utf-8") as f:
    f.write(final_content)
