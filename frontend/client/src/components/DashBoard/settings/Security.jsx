import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";

const Security = ({isDarkMode}) => {
	const [twoFactor, setTwoFactor] = useState(false);

	return (
		<SettingSection icon={Lock} title={"Security"} isDarkMode = {isDarkMode}>
			<ToggleSwitch
                isDarkMode = {isDarkMode}
				label={"Two-Factor Authentication"}
				isOn={twoFactor}
				onToggle={() => setTwoFactor(!twoFactor)}
			/>
			<div className='mt-4'>
				<button
					className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded 
        transition duration-200
        '
				>
					Change Password
				</button>
			</div>
		</SettingSection>
	);
};
export default Security;
