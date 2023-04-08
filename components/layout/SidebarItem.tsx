import { IconType } from "react-icons";

interface SidebarItemProps {
    href?: string;
    label: string;
    icon: IconType;
    onClick?: () => void;
}


const SidebarItem: React.FC<SidebarItemProps> = ({
    href,
    label,
    icon: Icon,
    onClick
}) => {
    return (
        <div className="flex flex-row items-center">
            <div className="relative flex items-center justify-center p-4 rounded-full cursor-pointer h-14 w-14 hover:bg-slate-300 hover:bg-opacity-10 lg:hidden">
                <Icon size={28} color="white" />
            </div>
            <div className="items-center hidden gap-4 p-4 rounded-full cursor-pointer realtive lg:flex hover:bg-slate-300 hover:bg-opacity-10">
                <Icon size={24} color="white" />
                <p className="hidden text-xl text-white lg:block">
                    {label}
                </p>
            </div>
        </div>
    );
}

export default SidebarItem;