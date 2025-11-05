document.addEventListener('DOMContentLoaded', () => {

    // --- ESTADO DE LA APLICACIÓN ---

    // Base de datos de productos
    const menuData = [
        // Desayunos
        {
            id: 7,
            name: "Parfait de Yogurt y Granola",
            category: "desayuno",
            price: 55.00,
            image: "https://loremflickr.com/600/400/yogurt_parfait,food",
            description: "Capas de yogurt griego, granola casera de avena y miel, y bayas frescas.",
            nutrition: { calories: 290, protein: 15, carbs: 38, fat: 9 }
        },
        {
            id: 4,
            name: "Tarta de Frutos Rojos",
            category: "desayuno",
            price: 50.50,
            image: "https://loremflickr.com/600/400/berry_tart,food",
            description: "Base de almendra con crema pastelera vegana y frutos rojos frescos.",
            nutrition: { calories: 320, protein: 6, carbs: 40, fat: 15 }
        },
        {
            id: 14,
            name: "Omelette de Espinacas",
            category: "desayuno",
            price: 60.00,
            image: "https://loremflickr.com/600/400/spinach_omelette,food",
            description: "Omelette de claras con espinaca fresca, champiñones y queso feta.",
            nutrition: { calories: 310, protein: 28, carbs: 8, fat: 18 }
        },

        // Almuerzos
        {
            id: 2,
            name: "Bowl de Quinoa y Salmón",
            category: "almuerzo",
            price: 125.00,
            image: "https://loremflickr.com/600/400/salmon_quinoa_bowl,food",
            description: "Salmón al horno sobre cama de quinoa, con brócoli, edamame y aderezo de limón.",
            nutrition: { calories: 550, protein: 40, carbs: 45, fat: 25 }
        },
        {
            id: 1,
            name: "Wrap de Pollo y Aguacate",
            category: "almuerzo",
            price: 85.50,
            image: "https://loremflickr.com/600/400/chicken_wrap,food",
            description: "Tortilla integral con pollo a la parrilla, aguacate fresco, lechuga y tomate.",
            nutrition: { calories: 420, protein: 35, carbs: 30, fat: 18 }
        },
        {
            id: 11,
            name: "Lasaña de Berenjena (Veg)",
            category: "almuerzo",
            price: 90.00,
            image: "https://loremflickr.com/600/400/eggplant_lasagna,food",
            description: "Capas de berenjena a la parrilla, salsa de tomate casera, queso vegano y albahaca.",
            nutrition: { calories: 430, protein: 18, carbs: 35, fat: 25 }
        },

        // Cenas
        {
            id: 6,
            name: "Sliders de Res y Cebolla",
            category: "cena",
            price: 105.00,
            image: "https://loremflickr.com/600/400/beef_sliders,food",
            description: "Mini hamburguesas de res premium con cebolla caramelizada y queso suizo.",
            nutrition: { calories: 480, protein: 28, carbs: 35, fat: 22 }
        },
        {
            id: 15,
            name: "Pollo al Curry con Arroz",
            category: "cena",
            price: 95.00,
            image: "https://loremflickr.com/600/400/chicken_curry,food",
            description: "Trozos de pollo en salsa de curry suave con coco, acompañado de arroz basmati.",
            nutrition: { calories: 510, protein: 38, carbs: 50, fat: 18 }
        },
        {
            id: 16,
            name: "Ensalada César con Camarones",
            category: "cena",
            price: 110.00,
            image: "https://loremflickr.com/600/400/shrimp_salad,food",
            description: "Lechuga romana, crutones integrales, queso parmesano y camarones a la parrilla.",
            nutrition: { calories: 390, protein: 30, carbs: 20, fat: 22 }
        },

        // Aperitivos
        {
            id: 3,
            name: "Mini Brochetas Caprese",
            category: "aperitivo",
            price: 60.00,
            image: "https://loremflickr.com/600/400/caprese_skewers,food",
            description: "Tomates cherry, mozzarella fresca y albahaca con reducción de balsámico.",
            nutrition: { calories: 150, protein: 8, carbs: 10, fat: 9 }
        },
        {
            id: 9,
            name: "Tabla de Quesos y Fiambres",
            category: "aperitivo",
            price: 150.00,
            image: "https://loremflickr.com/600/400/charcuterie_board,food",
            description: "Selección de quesos, jamón serrano, salami y frutas de estación.",
            nutrition: { calories: 650, protein: 30, carbs: 20, fat: 50 }
        },
        {
            id: 10,
            name: "Ceviche Clásico",
            category: "aperitivo",
            price: 75.00,
            image: "https://loremflickr.com/600/400/ceviche,food",
            description: "Pescado blanco fresco marinado en limón, con cebolla morada, cilantro y maíz.",
            nutrition: { calories: 210, protein: 25, carbs: 15, fat: 5 }
        }
    ];

    // Pack semanal del usuario
    let weeklyPack = JSON.parse(localStorage.getItem('betterLifePack')) || {
        desayuno: null,
        almuerzo: null,
        cena: null,
        aperitivo: null
    };

    const categoryTitles = {
        desayuno: "Desayunos",
        almuerzo: "Almuerzos",
        cena: "Cenas",
        aperitivo: "Aperitivos"
    };

    // --- ELEMENTOS DEL DOM ---
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuSectionsContainer = document.getElementById('menu-sections-container');
    const packCount = document.getElementById('pack-count');
    const packSummaryContainer = document.getElementById('pack-summary-container');
    const packTotalContainer = document.getElementById('pack-total-container');
    const packIncompleteMessage = document.getElementById('pack-incomplete-message');
    const deliveryFormContainer = document.getElementById('delivery-form-container');
    const deliveryForm = document.getElementById('delivery-form');
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    const successMessage = document.getElementById('order-success-message');
    const closeSuccessMessage = document.getElementById('close-success-message');

    // --- NAVEGACIÓN ---

    /**
     * Muestra la página solicitada y oculta las demás.
     * @param {string} pageId - El ID de la página a mostrar (ej: "home", "menu").
     */
    const navigateTo = (pageId) => {
        pages.forEach(page => {
            // La página de cotización ahora se llama "pack-summary"
            const id = page.id.replace('page-quote', 'page-pack-summary');
            if (id === `page-${pageId}`) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Lógica especial para la página de resumen
        if (pageId === 'pack-summary') {
            renderPackSummary();
        }

        window.scrollTo(0, 0); // Volver al inicio de la página
        mobileMenu.classList.add('hidden'); // Ocultar menú móvil al navegar
    };

    // Event Listeners para los links de navegación
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            if (pageId) {
                navigateTo(pageId);
            }
        });
    });

    // Event Listener para el menú móvil
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- LÓGICA DEL MENÚ (PACK BUILDER) ---

    /**
     * Renderiza todas las secciones del menú.
     */
    const renderMenuSections = () => {
        if (!menuSectionsContainer) return;
        menuSectionsContainer.innerHTML = ''; // Limpiar

        Object.keys(categoryTitles).forEach(categoryKey => {
            const items = menuData.filter(item => item.category === categoryKey);

            const section = document.createElement('section');
            section.id = `menu-section-${categoryKey}`;

            const title = document.createElement('h2');
            title.className = 'text-3xl font-bold font-brand text-gray-800 mb-6';
            title.textContent = categoryTitles[categoryKey];
            section.appendChild(title);

            const grid = document.createElement('div');
            grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';

            items.forEach(item => {
                const isSelected = weeklyPack[categoryKey] === item.id;
                const card = document.createElement('div');
                card.className = 'bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1';
                card.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-full h-56 object-cover">
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <h3 class="text-xl font-bold text-gray-800">${item.name}</h3>
                            <span class="text-xl font-bold text-emerald-600">Bs. ${item.price.toFixed(2)}</span>
                        </div>
                        <p class="text-gray-600 text-sm mb-4">${item.description}</p>
                        
                        <!-- Información Nutricional -->
                        <div class="border-t border-gray-100 pt-3 mb-4">
                            <h4 class="text-xs font-semibold text-gray-500 uppercase mb-2">Info. Nutricional (aprox.)</h4>
                            <div class="flex justify-between text-sm text-gray-700">
                                <span>Calorías: <b class="text-gray-900">${item.nutrition.calories}kcal</b></span>
                                <span>Proteínas: <b class="text-gray-900">${item.nutrition.protein}g</b></span>
                                <span>Grasas: <b class="text-gray-900">${item.nutrition.fat}g</b></span>
                            </div>
                        </div>
                        
                        <button class="select-pack-btn w-full px-4 py-2 rounded-full font-bold ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-category="${item.category}">
                            ${isSelected ? 'Seleccionado' : 'Seleccionar'}
                        </button>
                    </div>
                `;
                grid.appendChild(card);
            });

            section.appendChild(grid);
            menuSectionsContainer.appendChild(section);
        });

        // Añadir event listeners a los botones "Seleccionar"
        menuSectionsContainer.querySelectorAll('.select-pack-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.getAttribute('data-id'));
                const category = button.getAttribute('data-category');
                selectPackItem(id, category);
            });
        });
    };

    // --- LÓGICA DEL PACK ---

    /**
     * Guarda el pack en localStorage.
     */
    const savePack = () => {
        localStorage.setItem('betterLifePack', JSON.stringify(weeklyPack));
    };

    /**
     * Muestra una notificación (toast).
     * @param {string} message - Mensaje a mostrar.
     */
    const showToast = (message) => {
        toastMessage.textContent = message;
        toast.classList.remove('translate-y-20', 'opacity-0');
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 2500);
    };

    /**
     * Selecciona un item para una categoría del pack.
     * @param {number} itemId - ID del producto.
     * @param {string} category - Categoría (desayuno, almuerzo, etc.)
     */
    const selectPackItem = (itemId, category) => {
        // Actualizar el estado
        weeklyPack[category] = itemId;

        // Actualizar la UI de esa sección
        const section = document.getElementById(`menu-section-${category}`);
        if (section) {
            section.querySelectorAll('.select-pack-btn').forEach(button => {
                const btnId = parseInt(button.getAttribute('data-id'));
                if (btnId === itemId) {
                    button.classList.add('selected');
                    button.textContent = 'Seleccionado';
                } else {
                    button.classList.remove('selected');
                    button.textContent = 'Seleccionar';
                }
            });
        }

        savePack();
        updatePackCount();
        const itemData = menuData.find(item => item.id === itemId);
        showToast(`"${itemData.name}" seleccionado para ${categoryTitles[category]}.`);
    };

    /**
     * Actualiza el contador del ícono del pack.
     */
    const updatePackCount = () => {
        const selectedCount = Object.values(weeklyPack).filter(item => item !== null).length;
        packCount.textContent = `${selectedCount}/4`;
    };

    /**
     * Renderiza el resumen del pack en la página de finalización.
     */
    const renderPackSummary = () => {
        packSummaryContainer.innerHTML = '';
        packTotalContainer.innerHTML = '';

        const selectedItems = Object.keys(weeklyPack)
            .map(category => {
                const itemId = weeklyPack[category];
                if (itemId === null) {
                    return { category, item: null };
                }
                const itemData = menuData.find(item => item.id === itemId);
                return { category, item: itemData };
            });

        const isComplete = selectedItems.every(entry => entry.item !== null);

        if (!isComplete) {
            packIncompleteMessage.style.display = 'block';
            deliveryFormContainer.style.display = 'none';
            packTotalContainer.style.display = 'none';
        } else {
            packIncompleteMessage.style.display = 'none';
            deliveryFormContainer.style.display = 'block';
            packTotalContainer.style.display = 'block';

            let subtotal = 0;

            selectedItems.forEach(entry => {
                const itemElement = document.createElement('div');
                itemElement.className = 'flex items-center justify-between gap-4 py-4 border-b border-gray-200';
                itemElement.innerHTML = `
                    <div class="flex items-center gap-3">
                        <img src="${entry.item.image}" alt="${entry.item.name}" class="w-16 h-16 object-cover rounded-lg">
                        <div>
                            <p class="text-xs font-semibold text-emerald-600 uppercase">${categoryTitles[entry.category]}</p>
                            <p class="font-bold text-gray-800">${entry.item.name}</p>
                        </div>
                    </div>
                    <span class="font-bold text-lg text-gray-800">Bs. ${entry.item.price.toFixed(2)}</span>
                `;
                packSummaryContainer.appendChild(itemElement);
                subtotal += entry.item.price;
            });

            // Renderizar total
            const totalElement = document.createElement('div');
            totalElement.className = 'space-y-2';
            const deliveryFee = 20.00; // Tarifa de entrega fija
            totalElement.innerHTML = `
                <div class="flex justify-between text-gray-600">
                    <span>Subtotal del Pack</span>
                    <span>Bs. ${subtotal.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                    <span>Tarifa de Entrega</span>
                    <span>Bs. ${deliveryFee.toFixed(2)}</span>
                </div>
                <div class="flex justify-between text-2xl font-bold text-gray-900 pt-2">
                    <span>Total Semanal</span>
                    <span>Bs. ${(subtotal + deliveryFee).toFixed(2)}</span>
                </div>
            `;
            packTotalContainer.appendChild(totalElement);
        }
    };

    // --- LÓGICA DE ENTREGA (FORMULARIO) ---

    deliveryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // (Mockup) Simular envío
        console.log("Enviando pedido...");

        // Recopilar datos del formulario
        const formData = new FormData(deliveryForm);
        const deliveryDetails = Object.fromEntries(formData.entries());

        // Recopilar datos del pack
        const packSummary = Object.keys(weeklyPack).map(category => {
            const item = menuData.find(i => i.id === weeklyPack[category]);
            return { category, name: item.name, price: item.price };
        });

        const subtotal = packSummary.reduce((sum, item) => sum + item.price, 0);
        const total = subtotal + 20.00; // 20.00 de entrega

        // Objeto completo del pedido (se enviaría a un backend)
        const fullOrder = {
            customer: deliveryDetails,
            pack: packSummary,
            estimatedTotal: total.toFixed(2)
        };

        console.log("PEDIDO COMPLETO:", JSON.stringify(fullOrder, null, 2));

        // Limpiar formulario y pack
        deliveryForm.reset();
        weeklyPack = { desayuno: null, almuerzo: null, cena: null, aperitivo: null };
        savePack();
        updatePackCount();
        renderPackSummary(); // Actualizará la UI al estado vacío

        // Mostrar mensaje de éxito
        successMessage.style.display = 'flex';
    });

    closeSuccessMessage.addEventListener('click', () => {
        successMessage.style.display = 'none';
        navigateTo('home'); // Volver al inicio
    });

    // --- INICIALIZACIÓN ---

    // Renderizar el menú en la carga inicial
    renderMenuSections();

    // Renderizar el contador del pack
    updatePackCount();

    // Ir a la página de inicio
    navigateTo('home');
});