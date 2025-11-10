import './styles.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

// Importing the different screens
import Title from './Screens/Title'
import TypeSelect from './Screens/TypeSelect'
import FateReading from './Screens/FateReading'
import LazySusan from './Screens/LazySusan'

function App() {
	return (
		// Screen Router for app navigation. Sets root URL as Github project name
		<Router basename="/">
			{/* Connecting the screens to the navigation. This is required for the app to see the paths*/}
			<Routes>
				{/* Default Home page will be Title Page */}
				<Route path="/" element={<Title />} />
				<Route path="/Screens/TypeSelect" element={<TypeSelect />} />
				<Route path="/Screens/FateReading" element={<FateReading />} />
				<Route path="/Screens/LazySusan" element={<LazySusan />} />
			</Routes>
		</Router>
	)
}

export default App
