import { useRef, useState } from "react";
import { useLogin, useRegister } from "~/hooks/useAuth";
import * as toastMessage from "~/utils/notification/index";
import { LoadingButton } from "../ui/Spinner";
import { PopUp } from "../ui/PopUp";

export const AuthForm = () => {
	const [registerForm, setRegisterForm] = useState(true);
	const [connecting, setConnecting] = useState(false);
	const [registered, setRegistered] = useState(false);

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
	});

	const fullNameInputRef = useRef();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	const confirmPasswordInputRef = useRef();

	const clearInputs = () => {
		fullNameInputRef.current.value = "";
		emailInputRef.current.value = "";
		passwordInputRef.current.value = "";
		confirmPasswordInputRef.current.value = "";
	};

	const { mutate: login } = useLogin(setConnecting);
	const { mutate: register } = useRegister(
		setOpen,
		open,
		clearInputs,
		setRegisterForm,
		setRegistered
	);

	const handleSubmit = (e) => {
		e.preventDefault();

		const fullName = fullNameInputRef?.current?.value;
		const email = emailInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;
		const confirmPassword = confirmPasswordInputRef?.current?.value;

		try {
			if (registerForm) {
				if (!email || !password) {
					toastMessage.info("נא למלא את כל השדות.");
					return;
				}
				setConnecting(true);
				const user = { email, password };
				login(user);
			} else {
				if (!fullName || !email || !password || !confirmPassword) {
					toastMessage.info("נא למלא את כל השדות.");
					return;
				}

				if (password !== confirmPassword) {
					toastMessage.error("הסיסמאות אינן תאומות.");
					return;
				}

				if (password.length <= 6) {
					toastMessage.error("סיסמא צריכה להכיל מינימום 7 תווים.");
					return;
				}
				setRegistered(true);
				const user = { fullName, email, password, confirmPassword };
				register(user);
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessage.error(error);
			else toastMessage.error("שגיאה: בעיית התחברות לשרת");
		}
	};

	return (
		<>
			{!open.popUp ? (
				<form onSubmit={handleSubmit} className="flex justify-center">
					<div className="relative flex flex-col justify-center w-2/5 min-h-screen p-4 overflow-hidden lg:w-4/5 sm:w-full">
						<div className="w-full p-6 m-auto bg-white border shadow-lg shadow-gray border-gray rounded-xl hover:shadow-gray-dark lg:max-w-xl">
							<span className="flex justify-center text-3xl font-semibold text-center">
								{registerForm ? "התחברות" : "הרשמה"}
							</span>

							{!registerForm && (
								<div className="mb-2">
									<label
										htmlFor="fullName"
										className="block text-sm font-semibold text-gray-800"
									>
										שם מלא
									</label>
									<input
										placeholder="שם מלא"
										type="text"
										className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
										ref={fullNameInputRef}
										required
									/>
								</div>
							)}

							<div className="mb-2">
								<label
									htmlFor="email"
									className="block text-sm font-semibold text-gray-800"
								>
									מייל
								</label>
								<input
									placeholder="מייל"
									type="email"
									className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
									ref={emailInputRef}
									required
								/>
							</div>
							<div className="mb-2">
								<label
									htmlFor="password"
									className="block text-sm font-semibold text-gray-800"
								>
									סיסמא
								</label>
								<input
									placeholder="סיסמא"
									type="password"
									className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
									ref={passwordInputRef}
									required
								/>
								{!registerForm && (
									<label
										htmlFor="password"
										className="block text-sm font-semibold text-gray/80"
									>
										מינימום 7 תווים.
									</label>
								)}
							</div>

							{!registerForm && (
								<div className="mb-2">
									<label
										htmlFor="password"
										className="block text-sm font-semibold text-gray-800"
									>
										אימות סיסמא
									</label>
									<input
										placeholder="אימות סיסמא"
										type="password"
										className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
										ref={confirmPasswordInputRef}
										required
									/>
								</div>
							)}

							{!registerForm ? (
								<div className="grid w-2/5 p-2 justify-strat sm:w-full">
									<span
										className="cursor-pointer sm:text-base"
										onClick={() =>
											setRegisterForm(!registerForm)
										}
									>
										להתחברות
									</span>
								</div>
							) : (
								<div className="grid w-2/5 p-2 justify-strat xl:w-full sm:w-full">
									<span
										className="cursor-pointer sm:text-base"
										onClick={() =>
											setRegisterForm(!registerForm)
										}
									>
										לא קיים משתמש? מוזמנ/ת להרשם.
									</span>
								</div>
							)}
							{!registerForm ? (
								<div className="mt-6 rounded-xl">
									<button
										className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md bg-red-lite ${
											registered
												? "bg-red-lite/60"
												: "bg-red-lite"
										}`}
										disabled={registered}
									>
										{registered ? (
											<LoadingButton />
										) : (
											"הרשמה"
										)}
									</button>
								</div>
							) : (
								<div className="mt-6 rounded-xl">
									<button
										className={`w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md bg-red-lite ${
											connecting
												? "bg-red-lite/60"
												: "bg-red-lite"
										}`}
										disabled={connecting}
									>
										{connecting ? (
											<LoadingButton />
										) : (
											"התחבר"
										)}
									</button>
								</div>
							)}
						</div>
					</div>
				</form>
			) : (
				<PopUp setOpen={setOpen} open={open}>
					<div className="flex flex-wrap justify-center p-3 m-4 gap-y-3 ">
						<span className="text-xl font-bold sm:text-lg">
							אנחנו שנייה מלהתחיל.
						</span>
						<span className="text-xl sm:text-lg">
							ברגעים אלו ממש נשלח אלייך מייל לאימות. <br />
							<span>וזהו, יותר אני לא מציק, מבטיח 🤣.</span>
						</span>
					</div>
				</PopUp>
			)}
		</>
	);
};
