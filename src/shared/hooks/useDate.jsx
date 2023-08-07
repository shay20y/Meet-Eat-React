import { useState } from "react";

export const useDate = () => {


    const useSetConvertEventDate = (dateStr , set) => {
        const eventDate = new Date(dateStr);
        const year = eventDate.getFullYear();
        const month = String(eventDate.getMonth() + 1).padStart(2, '0');
        const day = String(eventDate.getDate()).padStart(2, '0');
        set(`${year}-${month}-${day}`);
    };

    const useSetDefaultData = (set) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        set(`${year}-${month}-${day}`);
      }

    const useGetToday = () => {
        const today = new Date()
        return today;
    }
 
    return {
        useSetConvertEventDate,
        useGetToday,
        useSetDefaultData
    };
};
