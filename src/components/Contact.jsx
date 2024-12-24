import Spline from "@splinetool/react-spline";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

function Contact() {
    const form = useRef();
    const [uemail, setUemail] = useState('');
    const [uname, setUname] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [buttonColor, setButtonColor] = useState('bg-black'); // Button color state

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);  // Start loading
        setStatusMessage('Submitting...'); // Show submitting message
        setButtonColor('bg-black'); // Default button color when submitting
        
        emailjs.send(
            "service_crg67oq",
            "template_mnf9zj8",
            {
                from_email: uemail,
                from_name: uname,
                message: msg,
            },{
                publicKey:"EW117FJmLisdVGUTk"
            }
        ).then(
            () => {
                setStatusMessage('Submitted successfully!');  // Show success message
                setButtonColor('bg-green-500');  // Change button color to green
                setLoading(false);  // Stop loading
                // Optionally reset form fields
                setUemail('');
                setUname('');
                setMsg('');
            },
            (error) => {
                setStatusMessage('Error while submitting!');  // Show failure message
                setButtonColor('bg-red-500');  // Change button color to red
                setLoading(false);  // Stop loading
            }
        );
    };

    return ( 
        <div className="contact-section w-screen h-screen bg-white flex justify-center items-center">
            <div className="w-1/2 h-full">
                <Spline
                    scene="https://prod.spline.design/qc4zZRBN7srYp0s4/scene.splinecode" 
                />
            </div>
            <div className="h-full w-1/2 flex flex-col justify-center items-center">
                <h1 className="text-4xl text-center text-black font-bold">Contact Us</h1>
                <form className="form mt-8 text-black w-full " ref={form} onSubmit={sendEmail}>
                    <input 
                        type="text" 
                        className="w-4/5 mb-4 py-2 px-3 border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors" 
                        placeholder="Enter your Name" 
                        onChange={(e) => setUname(e.target.value)} 
                        value={uname}
                        required 
                    />
                    <br />
                    <input 
                        type="email" 
                        className="w-4/5 mb-4 py-2 px-3 border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors" 
                        placeholder="Enter your Email" 
                        onChange={(e) => setUemail(e.target.value)} 
                        value={uemail}
                        required 
                    />
                    <br />
                    <textarea 
                        className="w-4/5 mb-4 py-2 px-3 border-b-2 border-gray-300 focus:border-black focus:outline-none transition-colors" 
                        placeholder="Your thoughts..." 
                        onChange={(e) => setMsg(e.target.value)} 
                        value={msg}
                    ></textarea>
                    <br />
                    <button 
                        type="submit" 
                        className={`w-4/5 py-2 px-4 ${buttonColor} text-white font-bold rounded-md hover:bg-gray-700 transition-colors`}
                        disabled={loading} // Disable the button when submitting
                    >
                        {loading ? "Submitting..." : "Submit...."} {/* Change button text */}
                    </button>
                </form>
                {statusMessage && (
                    <p className={`mt-4 text-lg font-semibold text-center ${buttonColor === 'bg-green-500' ? 'text-green-500' : 'text-red-500'}`}>
                        {statusMessage} 
                    </p>
                )}
            </div>
        </div>
    );
}

export default Contact;
