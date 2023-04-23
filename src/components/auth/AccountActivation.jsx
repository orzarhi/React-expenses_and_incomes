import { useParams } from "react-router-dom";
import { useActivationMail } from "~/hooks/useAuth";
import * as toastMessage from "~/utils/notification/index";

export const AccountActivation = () => {
	const { mutate: activationMail } = useActivationMail();

	const emailToken = useParams()?.emailToken;
	try {
		activationMail(emailToken);
	} catch (err) {
		const error = err?.response?.data?.message;
		if (error) toastMessage.error(error);
		else toastMessage.error("משהו השתבש, נא לנסות שוב.");
	}
};
