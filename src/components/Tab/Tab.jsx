import { useRef, useState } from 'react';
import { TABS } from '../../constants/contants.js';
import './Tab.scss'

function Tab() {
    const tabRef = useRef(null)
    setTimeout(() => {
        tabRef.current.style.opacity = 1
    }, 200);

    const [selectedTab, setSelectedTab] = useState('')
    const onTabClick = (name) => {
        setSelectedTab(name)
        if (name === 'debounce & throttle') {
            loadScript('debounce')
            loadScript('throttle')
        } else {
            loadScript(name)
        }
    }

    const loadScript = (name) => {
        const script = document.createElement('script')
        script.type = 'module'
        script.src = `/polyfills-js/${name}.js?timestamp=${new Date().getTime()}`
        document.body.appendChild(script)
    }
    
    const [inputValue, setInputValue] = useState('')

    return (
        <div>
            <div className='tab flex' ref={tabRef}>
                {TABS.map(name => 
                    <span className='tab__cell' key={name} onClick={() => onTabClick(name)}>
                        { name }
                    </span>
                )}
            </div>
            {selectedTab === 'debounce & throttle' &&
                <div className='flex flex-col mt-10 p-4'>
                    <input
                        type="text"
                        className='input-field w-full'
                        id='inputField'
                        placeholder='Type something to test debounce and throttle...'
                        onChange={e => setInputValue(e.target.value)}
                    />
                    {inputValue && <div className='font-darker mt-10'>Debounce:</div>}
                    <div className='mt-1' id='debounce_text' />
                    {inputValue && <div className='font-darker mt-8'>Throttle:</div>}
                    <div className='mt-1' id='throttle_text' />
                </div>
            }
        </div>
    )
}

export default Tab;