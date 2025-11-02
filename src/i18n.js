import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      rooms: "Rooms",
      login: "Login",
      logout: "Logout",
      book: "Book",
      add_room: "Add Room",
      edit: "Edit",
      delete: "Delete",
      my_bookings: "My Bookings",
    },
  },
  bn: {
    translation: {
      rooms: "কক্ষসমূহ",
      login: "প্রবেশ করুন",
      logout: "বাহির",
      book: "বুক করুন",
      add_room: "নতুন কক্ষ যোগ করুন",
      edit: "সম্পাদনা",
      delete: "মুছুন",
      my_bookings: "আমার বুকিংস",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
