// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// global constants
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
const profileEditButton = document.querySelector('.profile__edit-button');
const placesList = document.querySelector('.places__list');
const templateElement = document.querySelector('#card-template').content;

function createCard(name, link) {
    
    const cardElement = templateElement.querySelector('.card').cloneNode(true);
    const image = cardElement.querySelector('.card__image');
    image.setAttribute('src', link);
    image.setAttribute('alt', name);
    cardElement.querySelector('.card__title').textContent = name;

    cardElement.addEventListener('click', evt => {
        const target = evt.target;
        
        if (target.classList.contains("card__like-button"))
            target.classList.toggle('card__like-button_is-active');
        
        if (target.classList.contains("card__delete-button")){
            const item = target.closest('.card');
            item.remove();
        }
        
        if (target.classList.contains("card__image")){
            const image = imagePopup.querySelector('.popup__image');
            image.setAttribute('src', link);
            image.setAttribute('alt', name);
            imagePopup.querySelector('.popup__caption').textContent = name;
            openModal(imagePopup);
            
            const closeButton = imagePopup.querySelector('.popup__close');
            closeButton.addEventListener('click', () => closeModal(imagePopup));
        }
    });

    return cardElement;
}

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}
function defaultCardInitialization() {
    for (let i = 0; i < initialCards.length; i++){
        const card = createCard(initialCards[i].name, initialCards[i].link);
        placesList.append(card);
    }
}

defaultCardInitialization();

// Profile popup
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileNameInput = profilePopup.querySelector('.popup__input_type_name');
const profileDescInput = profilePopup.querySelector('.popup__input_type_description');
const closeButtonProfile = profilePopup.querySelector('.popup__close');
const editProfileForm = profilePopup.querySelector('.popup__form');


profileEditButton.addEventListener('click', () => {

    profileNameInput.value = profileTitle.textContent;
    profileDescInput.value = profileDescription.textContent;
    openModal(profilePopup);
});

closeButtonProfile.addEventListener('click', () => closeModal(profilePopup));

function editProfileHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileNameInput.value;
    profileDescription.textContent = profileDescInput.value;
    closeModal(profilePopup);
}

editProfileForm.addEventListener('submit', editProfileHandler);

// Card popup
const addButtonCard =  document.querySelector('.profile__add-button');
const closeButtonCard = cardPopup.querySelector('.popup__close');
const cardInputName = cardPopup.querySelector('.popup__input_type_card-name');
const cardInputUrl = cardPopup.querySelector('.popup__input_type_url');
const cardForm = cardPopup.querySelector('.popup__form');


addButtonCard.addEventListener('click', () => {
    cardInputName.value = '';
    cardInputUrl.value = '';
    openModal(cardPopup);
});

closeButtonCard.addEventListener('click', () => closeModal(cardPopup));

function addCardHandler(evt) {
    evt.preventDefault();

    const name = cardInputName.value;
    const url = cardInputUrl.value;
    const card = createCard(name, url);

    placesList.prepend(card);

    closeModal(cardPopup);
}

cardForm.addEventListener('submit', addCardHandler);





