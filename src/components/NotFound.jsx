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
        <div className="flex flex-col items-center justify-center gap-4 p-12 mt-20 text-4xl text-white sm:text-lg">
            <span className="block text-3xl text-center sm:text-2xl">
                אופס... <span className="text-red">404</span>
            </span>
            <span>
                את/ה מועבר לבית בעוד {timer} שניות 🏡.
            </span>
        </div>
    );
};


