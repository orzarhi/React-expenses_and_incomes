import { useEffect, useRef, useState } from "react";
import { useChangePassword, useForgotPassword, useVerificationCode } from "~/hooks/useAuth";
import * as toastMessage from "~/utils/notification/index";
import { PopUp } from "../ui/PopUp";

export const ForgotPassword = ({ setOpen, open }) => {
	const [showVerificationCode, setShowVerificationCode] = useState(false);
	const [successfullyVerified, setSuccessfullyVerified] = useState(false);
	const [currentRealCode, setCurrentRealCode] = useState("");
	const [userEmail, setUserEmail] = useState("");

	const emailInputRef = useRef();
	const codeInputRef = useRef();
	const changePasswordInputRef = useRef();
	const confrimPasswordInputRef = useRef();

	const textBtn = successfullyVerified ? "שינוי סיסמא" : "אימות"

	const clearInputs = () => {
		emailInputRef.current.value = "";
	};


	const clearPasswordInputs = () => {
		changePasswordInputRef.current.value = "";
		confrimPasswordInputRef.current.value = "";
	};

	useEffect(() => {
		if (successfullyVerified) {
			changePasswordInputRef.current.value = "";
		}
	}, [successfullyVerified])

	const { mutate: mutateChangePassword } = useChangePassword(setOpen, open, clearPasswordInputs);
	const { mutate: mutateForgotPassword } = useForgotPassword(setShowVerificationCode, clearInputs, setCurrentRealCode);
	const { mutate: mutateVerificationCode } = useVerificationCode(setSuccessfullyVerified);

	const handleSubmit = (e) => {
		e.preventDefault();

		const email = emailInputRef?.current?.value;

		if (email) setUserEmail(email);

		const code = codeInputRef?.current?.value;
		const password = changePasswordInputRef?.current?.value;
		const confrimPassword = confrimPasswordInputRef?.current?.value;

		try {
			if (!showVerificationCode) {
				if (!email) {
					toastMessage.info("נא למלא את השדה.");
					return;
				}

				const user = { email };
				mutateForgotPassword(user);
			}
			else if (successfullyVerified) {
				if (!password || !confrimPassword) {
					toastMessage.info("נא למלא את כל השדות.");
					return;
				}

				if (password !== confrimPassword) {
					toastMessage.error("הסיסמאות אינן תאומות.");
					return;
				}
				const changedPassword = { password, confrimPassword, email: userEmail };
				mutateChangePassword(changedPassword);
			}
			else {
				if (!code) {
					toastMessage.info("נא למלא את השדה.");
					return;
				}
				if (code !== currentRealCode) {
					toastMessage.error("קוד האימות אינו תואם.");
					return;
				}
				const verificationCode = { code, currentRealCode };
				mutateVerificationCode(verificationCode)
			}
		} catch (err) {
			const error = err?.response?.data?.message;
			if (error) toastMessage.error(error);
			else toastMessage.error("משהו השתבש, נא לנסות שוב.");
		}
	};

	return (
		<PopUp setOpen={setOpen} open={open}>
			<form
				className="flex flex-wrap justify-center p-6 m-4 gap-y-7"
				onSubmit={handleSubmit}
			>
				{successfullyVerified ?
					<>
						<span className="text-2xl sm:text-base sm:font-bold">
							החלפת סיסמא 🔐
						</span>
						<div className="w-full">
							<label
								className="block text-sm font-semibold"
							>
								סיסמא חדשה
							</label>
							<input
								placeholder="סיסמא חדשה"
								type="password"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
								ref={changePasswordInputRef}
								required
							/>
							<label
								htmlFor="password"
								className="block text-sm font-semibold text-gray/80"
							>
								מינימום 7 תווים.
							</label>
							<label
								htmlFor="password"
								className="block text-sm font-semibold mt-6"
							>
								אימות סיסמא חדשה
							</label>
							<input
								placeholder="אימות סיסמא חדשה"
								type="password"
								className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
								ref={confrimPasswordInputRef}
								required
							/>
						</div>
					</>
					:
					<>
						<span className="text-2xl sm:text-base sm:font-bold">
							לא נורא, זה קורה לכולנו.
						</span>

						<div className="w-full">
							{!showVerificationCode ? (
								<>
									<label
										htmlFor="email"
										className="block text-sm font-semibold"
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
								</>
							) : (
								<>
									<label
										htmlFor="verificationCode"
										className="block text-sm font-semibold"
									>
										קוד אימות
									</label>
									<input
										placeholder="קוד אימות"
										type="text"
										className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-red-lite focus:ring-red-lite focus:outline-none focus:ring focus:ring-opacity-40"
										ref={codeInputRef}
										required
									/>
								</>
							)}

						</div>
					</>
				}
				<div className="flex items-center justify-center p-2">
					{!showVerificationCode ? (
						<button className="w-full px-4 py-2 tracking-wide text-white transition-colors  rounded-md bg-red-lite">
							שלח לי אימות
						</button>
					) : (
						<button className="w-full px-4 py-2 tracking-wide text-white transition-colors  rounded-md bg-red-lite">
							{textBtn}
						</button>
					)}
				</div>
			</form>
		</PopUp>
	);
};
