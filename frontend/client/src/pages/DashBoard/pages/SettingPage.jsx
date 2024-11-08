import Header from "../../../components/DashBoard/common/Header";
import Profile from "../../../components/DashBoard/settings/Profile";
import Notifications from "../../../components/DashBoard/settings/Notification";
import Security from "../../../components/DashBoard/settings/Security";
import ConnectedAccounts from "../../../components/DashBoard/settings/ConnectedAccounts";
import DangerZone from "../../../components/DashBoard/settings/DangerZone";
import { useOutletContext } from "react-router-dom";
const SettingsPage = () => {
  const { isDarkMode, setIsDarkMode } = useOutletContext(); // Lấy context từ Outlet
	return (
		<div className='flex-1 overflow-auto relative z-10 '>
			<Header title='Settings' isDarkMode={isDarkMode} setIsDarkMode = {setIsDarkMode}/>
			<main className='max-w-4xl mx-auto py-6 px-4 lg:px-8'>
				<Profile isDarkMode={isDarkMode}/>
				<Notifications isDarkMode={isDarkMode}/>
				<Security isDarkMode={isDarkMode}/>
				<ConnectedAccounts isDarkMode={isDarkMode}/>
				<DangerZone isDarkMode={isDarkMode}/>
			</main>
		</div>
	);
};
export default SettingsPage;
