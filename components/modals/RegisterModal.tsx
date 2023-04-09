import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/register', {
                email,
                password,
                name,
                username
            });
            toast.success('Account created');
            signIn('credentials', {
                email,
                password
            });

            registerModal.onClose();
        } catch (e) {
            console.log(e);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, name, username]);

    const onToggle = useCallback(() => {
        if (isLoading) return;

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]);


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} disabled={isLoading} />
            <Input placeholder="Name" onChange={(e) => setName(e.target.value)} value={name} disabled={isLoading} />
            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} disabled={isLoading} />
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} disabled={isLoading} type="password" />
        </div>
    )

    const footerContent = (
        <div className="mt-4 text-center text-neutral-400">
            <p>Already have an account? <span className="text-white cursor-pointer hover:underline" onClick={onToggle}> Sign in</span></p>
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title="Create an account" actionLabel="Register" onClose={registerModal.onClose} onSubmit={onSubmit} body={bodyContent} footer={footerContent
        } />
    );

}

export default RegisterModal;