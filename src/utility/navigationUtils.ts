import { useLocation, useNavigate } from 'react-router-dom';

export const useBackNavigation = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleBack = () => {
        if (location.key === 'default') {
            navigate('/')
        } else {
            navigate(-1)
        }
    }

    return handleBack;
}