import { useRef, useState } from 'react';
import Tab from '../../components/Tab/Tab.jsx'
import './Home.scss'

function Home() {
    const introRef = useRef(0)

    const [showMain, setShowMain] = useState(false)

    setTimeout(() => {
        introRef.current.style.display = "none"
        setShowMain(true)
    }, 1500);

    setTimeout(() => {
        introRef.current.style.fontSize = "3rem"
    });

    return (
        <div className='home'>
            <div className='home__intro flex justify-center items-center' ref={introRef}>
                <h1>YOUR POLYFILL PLAYGROUND</h1>
            </div>
            {
                showMain &&
                <div className='home__main'>
                    <Tab />
                </div>
            }
            <footer>
                <div className='text-sm'>open Console to play with polyfills...</div>
                <div className='text-sm'>find the code for all the polyfills: /public/polyfills-js</div>
            </footer>
        </div>
    )
}

export default Home;