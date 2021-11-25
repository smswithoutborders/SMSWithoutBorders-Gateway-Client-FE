import React,
{
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import toast from "react-hot-toast";
import { Loading } from "carbon-components-react";
import { getModems, getStatus } from "../services/api.service";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [serviceState, setServiceState] = useState('inactive');
    const [modems, setModems] = useState([]);
    const [defaultModem, setDefaultModem] = useState()

    function getConnectedModems() {
        setLoading(true);
        getModems()
            .then((response) => {
                if (!response.data.length) {
                    toast.error("No modems found. Please connect them and restart your gateway")
                }
                setModems(response.data);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Could not fetch connected modems, check your Gateway connection");
                } else {
                    toast.error("Your Gateway may be disconnected");
                }
                setLoading(false);
            });
    }

    function refreshModems() {
        getModems()
            .then((response) => {
                if (!response.data.length) {
                    toast.error("No modems found. Please connect them and restart your gateway")
                }
                setModems(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Could not fetch connected modems, check your Gateway connection");
                } else {
                    toast.error("Your Gateway may be disconnected");
                }
            });
    }

    function getApiStatus() {
        setLoading(true);
        getStatus()
            .then((response) => {
                setServiceState(response.data);
                setLoading(false);
            })
            .catch(() => {
                toast.error("Your Gateway may be disconnected check if its running");
                setLoading(false);
            });
    }

    function handleSetDefaultModem(index) {
        setDefaultModem(index);
    }

    useEffect(() => {
        getApiStatus();
        getConnectedModems();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            refreshModems();
        }, 3000);
        return () => clearInterval(interval);
    })

    const sharedState = {
        loading,
        modems,
        serviceState,
        defaultModem,
        handleSetDefaultModem,
        getConnectedModems
    }

    return (
        <AppContext.Provider value={sharedState}>
            {loading ? <Loading /> : children}
        </AppContext.Provider>
    )
}


export { AppProvider, useAppContext }
