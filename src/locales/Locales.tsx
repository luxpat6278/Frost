export const APP_LOCALES = [
    {
      serviceName: "ru",
      displayName: "Русский",
    },
    {
      serviceName: "en",
      displayName: "English",
    },
    {
      serviceName: "kk",
      displayName: "Қазақша",
    },
  ] as const;
  
  type Locale = typeof APP_LOCALES[number]['serviceName'];
  
  interface Translations {
    message: string;
    buyButton: string;
    confirmButton: string;
    addToCartButton: string;
    productDetailsItemNumber: string;
    productDetailsProducer: string;
    productDetailsDescription: string;
    productDetailsAvailable: string;
    productDetailsNotAvailable: string;
    productDetails404: string;
    reviewAddFeedback: string;
    reviewAddComment: string;
    reviewAddReviewButton: string;
    reviewRecentFeedbacks: string;
    reviewExistingFeedback: string;
    filterAllBrands: string;
    filterAllModels: string;
    filterAllGenerations: string;
    contactsPhone: string;
    contactsDetails: string;
    contactsLastName: string;
    contactsFirstName: string;
    contactsPatronym: string;
    contactsEmail: string;
    contactsPassword: string;
    contactsRepeatPassword: string;
    contactsOptional: string;
    deliveryDetails: string;
    deliveryRegion: string;
    deliveryCity: string;
    deliveryStreet: string;
    deliveryHouse: string;
    deliveryApartment: string;
    orderCompleteNotification: string;
    orderCompleteOrderNumber: string;
    orderCompleteSeeProfile: string;
    orderCompleteProfile: string;
    footerContacts: string;
    addProductAddingToCart: string;
    addProductContinueShopping: string;
    loginInvalidEmail: string;
    loginInvalidPassword: string;
    loginSignIn: string;
    loginEmail: string;
    loginPassword: string;
    loginSignInButton: string;
    loginNoProfile: string;
    loginSignUp: string;
    signUpCreate: string;
    signUpFirstName: string;
    signUpLastName: string;
    signUpEmail: string;
    signUpPassword: string;
    signUpRepeatPassword: string;
    signUpProfileExists: string;
    signUpSignIn: string;
    pageNavBack: string;
    pageNavForward: string;
    productsGridNotAvailable: string;
    profileMyAccount: string;
    profileMyOrders: string;
    profileOrderNo: string;
    profileProduct: string;
    profileQuantity: string;
    profilePrice: string;
    profileDate: string;
    profileNoOrders: string;
    profileAddProducts: string;
    checkBoxAvailable: string;
    cartPageHeader: string;
    cartItemsCart: string;
    cartItemsItem: string;
    cartItemsQuantity: string;
    cartItemsPrice: string;
    cartItemsItemNo: string;
    cartItemsRemoveItem: string;
    cartItemsTotalPrice: string;
    cartItemsEmpty: string;
    cartItemsAddItems: string;
    cartItemsConfirmButton: string;
    cartRouteCart: string;
    cartRouteContacts: string;
    cartRouteDelivery: string;
    cartRouteComplete: string;
  }
  
  export const APP_TRANSLATIONS: Record<Locale, Translations> = {
    ru: {
      message: "Добро пожаловать!",
      buyButton: "В корзину",
      confirmButton: "Подтвердить",
      addToCartButton: "Добавить в корзину",
      productDetailsItemNumber: "Артикул",
      productDetailsProducer: "Производитель",
      productDetailsDescription: "Описание",
      productDetailsAvailable: "В наличии",
      productDetailsNotAvailable: "Не в наличии",
      productDetails404: "Такой страницы нет. Возвращаюсь на главную страницу",
      reviewAddFeedback: "Напишите свой отзыв",
      reviewAddComment: "Введите комментарий",
      reviewAddReviewButton: "Добавить отзыв",
      reviewRecentFeedbacks: "Последние отзывы",
      reviewExistingFeedback: "Спасибо, что оставили отзыв!",
      filterAllBrands: "Все марки",
      filterAllModels: "Все модели",
      filterAllGenerations: "Все поколения",
      contactsPhone: "Введите номер телефона",
      contactsDetails: "Контактные данные",
      contactsLastName: "Фамилия",
      contactsFirstName: "Имя",
      contactsPatronym: "Отчество",
      contactsEmail: "Электронная почта",
      contactsPassword: "Пароль",
      contactsRepeatPassword: "Повторите пароль",
      contactsOptional: "(Необязательно)",
      deliveryDetails: "Доставка",
      deliveryRegion: "Область",
      deliveryCity: "Город или поселок",
      deliveryStreet: "Улица",
      deliveryHouse: "Дом",
      deliveryApartment: "Квартира",
      orderCompleteNotification: "Заказ успешно создан",
      orderCompleteOrderNumber: "Номер Вашего заказа:",
      orderCompleteSeeProfile: "Список Ваших заказов указан в личном кабинете",
      orderCompleteProfile: "Перейти в личный кабинет",
      footerContacts: "Астана: +7 775 000 77 49",
      addProductAddingToCart: "Добавление товара в корзину",
      addProductContinueShopping: "Продолжить покупки",
      loginInvalidEmail: "Неверно введена почта",
      loginInvalidPassword: "Неверно введен пароль",
      loginSignIn: "Вход в учетную запись",
      loginEmail: "Электронная почта",
      loginPassword: "Пароль",
      loginSignInButton: "Войти в учетную запись",
      loginNoProfile: "Нет учетной записи?",
      loginSignUp: "Зарегистрироваться",
      signUpCreate: "Создание учетной записи",
      signUpFirstName: "Имя",
      signUpLastName: "Фамилия",
      signUpEmail: "Электронная почта",
      signUpPassword: "Пароль",
      signUpRepeatPassword: "Повторите пароль",
      signUpProfileExists: "Есть учетная запись?",
      signUpSignIn: "Войти",
      pageNavBack: "Назад",
      pageNavForward: "Вперед",
      productsGridNotAvailable: "Таких товаров не существует",
      profileMyAccount: "Личный кабинет",
      profileMyOrders: "Мои заказы",
      profileOrderNo: "Номер заказа",
      profileProduct: "Наименование товара",
      profileQuantity: "Количество",
      profilePrice: "Стоимость",
      profileDate: "Дата заказа",
      profileNoOrders: "У Вас еще нет заказов.",
      profileAddProducts: "Добавить товары",
      checkBoxAvailable: "В наличии",
      cartPageHeader: "Оформление заказа",
      cartItemsCart: "Корзина",
      cartItemsItem: "Наименование товара",
      cartItemsQuantity: "Количество",
      cartItemsPrice: "Цена",
      cartItemsItemNo: "Артикул:",
      cartItemsRemoveItem: "Удалить из корзины",
      cartItemsTotalPrice: "Итого к оплате:",
      cartItemsEmpty: "Ваша корзина пуста.",
      cartItemsAddItems: "Добавить товары",
      cartItemsConfirmButton: "Продолжить",
      cartRouteCart: "Корзина",
      cartRouteContacts: "Контакты",
      cartRouteDelivery: "Доставка",
      cartRouteComplete: "Завершение",
    },
    en: {
        message: "Welcome!",
        buyButton: "Add to cart",
        confirmButton: "Confirm",
        addToCartButton: "Add to cart",
    
        productDetailsItemNumber: "Item number:",
        productDetailsProducer: "Producer:",
        productDetailsDescription: "Description:",
        productDetailsAvailable: "Available",
        productDetailsNotAvailable: "Not available",
        productDetails404: "This page does not exist. Returning to the home page",
    
        reviewAddFeedback: "Feedback",
        reviewAddComment: "Write your comment",
        reviewAddReviewButton: "Add review",
        reviewRecentFeedbacks: "Recent feedbacks",
        reviewExistingFeedback: "Thank you for your feedback!",
    
        filterAllBrands: "All brands",
        filterAllModels: "All models",
        filterAllGenerations: "All generations",
    
        contactsPhone: "Enter your phone number",
        contactsDetails: "Contact details",
        contactsLastName: "Last name",
        contactsFirstName: "First name",
        contactsPatronym: "Patronym",
        contactsEmail: "Email",
        contactsPassword: "Password",
        contactsRepeatPassword: "Confirm password",
        contactsOptional: "(Optional)",
    
        deliveryDetails: "Delivery details",
        deliveryRegion: "Region",
        deliveryCity: "City or village",
        deliveryStreet: "Street",
        deliveryHouse: "Building",
        deliveryApartment: "Apartment",
    
        orderCompleteNotification: "Your order has been completed",
        orderCompleteOrderNumber: "Your order number is ",
        orderCompleteSeeProfile: "See your orders in your profile",
        orderCompleteProfile: "My account",
    
        footerContacts: "Astana: +7 775 000 77 49",
    
        addProductAddingToCart: "Adding an item to cart",
        addProductContinueShopping: "Continue shopping",
    
        loginInvalidEmail: "Incorrect email",
        loginInvalidPassword: "Incorrect password",
        loginSignIn: "Sign in to your account",
        loginEmail: "Email",
        loginPassword: "Password",
        loginSignInButton: "Sign in",
        loginNoProfile: "No account?",
        loginSignUp: "Sign up",
    
        signUpCreate: "Creating a new account",
        signUpFirstName: "First name",
        signUpLastName: "Last name",
        signUpEmail: "Email",
        signUpPassword: "Password",
        signUpRepeatPassword: "Confirm password",
        signUpProfileExists: "Have an account?",
        signUpSignIn: "Sign in",
    
        pageNavBack: "Back",
        pageNavForward: "Forward",
    
        productsGridNotAvailable: "No items available",
    
        profileMyAccount: "My account",
        profileMyOrders: "My orders",
        profileOrderNo: "Order No.",
        profileProduct: "Item",
        profileQuantity: "Quantity",
        profilePrice: "Price",
        profileDate: "Order date",
        profileNoOrders: "You don't have any orders.",
        profileAddProducts: "Add items",
    
        checkBoxAvailable: "Available",
    
        cartPageHeader: "Order placement",
    
        cartItemsCart: "My Cart",
        cartItemsItem: "Item",
        cartItemsQuantity: "Quantity",
        cartItemsPrice: "Price",
        cartItemsItemNo: "Item No:",
        cartItemsRemoveItem: "Remove",
        cartItemsTotalPrice: "Total price:",
        cartItemsEmpty: "The cart is empty.",
        cartItemsAddItems: "Add items",
        cartItemsConfirmButton: "Confirm",
    
        cartRouteCart: "Cart",
        cartRouteContacts: "Contacts",
        cartRouteDelivery: "Delivery",
        cartRouteComplete: "Final",
      },
    
      kk: {
        message: "Қош келдіңіздер!",
        buyButton: "Сатып алу",
        confirmButton: "Растау",
        addToCartButton: "Тауарды себетке қосу",
    
        productDetailsItemNumber: "Тауар нөмірі:",
        productDetailsProducer: "Өндіруші:",
        productDetailsDescription: "Сипаттама:",
        productDetailsAvailable: "Қол жетімді",
        productDetailsNotAvailable: "Қол жетімсіз",
        productDetails404: "Бұл бет жоқ. Негізгі бетке қайта оралу",
    
        reviewAddFeedback: "Пікіріңізді жазыңыз",
        reviewAddComment: "Пікір енгізіңіз",
        reviewAddReviewButton: "Қосу",
        reviewRecentFeedbacks: "Соңғы пікірлер",
        reviewExistingFeedback: "Пікіріңіз үшін рахмет!",
    
        filterAllBrands: "Барлық маркалар",
        filterAllModels: "Барлық модельдер",
        filterAllGenerations: "Барлық ұрпақтар",
    
        contactsPhone: "Телефон нөміріңізді енгізіңіз",
        contactsDetails: "Байланыс деректері",
        contactsLastName: "Тегі",
        contactsFirstName: "Аты",
        contactsPatronym: "Әкесінің аты",
        contactsEmail: "Электрондық пошта",
        contactsPassword: "Құпия сөз",
        contactsRepeatPassword: "Құпия сөзді қайта енгізіңіз",
        contactsOptional: "(Міндетті емес)",
    
        deliveryDetails: "Жеткізу",
        deliveryRegion: "Аймақ",
        deliveryCity: "Қала немесе ауыл",
        deliveryStreet: "Көше",
        deliveryHouse: "Үй",
        deliveryApartment: "Пәтер",
    
        orderCompleteNotification: "Тапсырыс сәтті құрылды",
        orderCompleteOrderNumber: "Сіздің тапсырыс нөміріңіз:",
        orderCompleteSeeProfile: "Сіздің тапсырыстарыңыздың тізімі жеке кабинетте көрсетілген",
        orderCompleteProfile: "Жеке кабинетке өту",
    
        footerContacts: "Астана: +7 775 000 77 49",
    
        addProductAddingToCart: "Тауарды себетке қосу",
        addProductContinueShopping: "Сатып алуды жалғастыру",
    
        loginInvalidEmail: "Дұрыс емес электрондық пошта",
        loginInvalidPassword: "Қате құпия сөз",
        loginSignIn: "Есептік жазбаға кіру",
        loginEmail: "Электрондық пошта",
        loginPassword: "Құпия сөз",
        loginSignInButton: "Есептік жазбаға кіру",
        loginNoProfile: "Есептік жазбаңыз жоқ па?",
        loginSignUp: "Тіркелу",
    
        signUpCreate: "Есептік жазба жасау",
        signUpFirstName: "Аты",
        signUpLastName: "Тегі",
        signUpEmail: "Электрондық пошта",
        signUpPassword: "Құпия сөз",
        signUpRepeatPassword: "Құпия сөзді қайталаңыз",
        signUpProfileExists: "Есептік жазбаңыз бар ма?",
        signUpSignIn: "Кіру",
    
        pageNavBack: "Артқа",
        pageNavForward: "Алға",
    
        productsGridNotAvailable: "Тауарлар жоқ",
    
        profileMyAccount: "Жеке кабинет",
        profileMyOrders: "Менің тапсырыстарым",
        profileOrderNo: "Тапсырыс нөмірі",
        profileProduct: "Тауар атауы",
        profileQuantity: "Саны",
        profilePrice: "Бағасы",
        profileDate: "Тапсырыс күні",
        profileNoOrders: "Сізде әлі тапсырыстар жоқ.",
        profileAddProducts: "Тауарлар қосу",
    
        checkBoxAvailable: "Қол жетімді",
    
        cartPageHeader: "Тапсырыс беру",
    
        cartItemsCart: "Себет",
        cartItemsItem: "Тауар атауы",
        cartItemsQuantity: "Саны",
        cartItemsPrice: "Бағасы",
        cartItemsItemNo: "Артикул:",
        cartItemsRemoveItem: "Себеттен жою",
        cartItemsTotalPrice: "Жалпы төлеу сомасы:",
        cartItemsEmpty: "Сіздің себетіңіз бос.",
        cartItemsAddItems: "Тауарлар қосу",
        cartItemsConfirmButton: "Жалғастыру",
    
        cartRouteCart: "Себет",
        cartRouteContacts: "Байланыс деректері",
        cartRouteDelivery: "Жеткізу",
        cartRouteComplete: "Аяқтау",
      },
    }
  
  export function translate(language: Locale, translationKey: string): string {
    return APP_TRANSLATIONS[language][translationKey]
  } 