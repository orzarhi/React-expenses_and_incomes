import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {

    const [timer, setTimer] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timer > 1) setTimer((prev) => prev - 1);
            else navigate("/");
        }, 1000);
        return () => clearTimeout(timeout);
    }, [timer]);

    return (
        <div className="flex justify-center items-center flex-col gap-4 mt-20 p-12 text-white text-4xl sm:text-lg">
            <span className="block text-center text-3xl sm:text-2xl">
                אופס... <span className="text-red">404</span>
            </span>
            <span>
                את/ה מעובר לבית בעוד {timer} שניות 🏡.
            </span>
        </div>
    );
};


