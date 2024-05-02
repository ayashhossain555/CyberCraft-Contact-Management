
const Navbar = () => {

    return (
        <div>
            <div className="navbar justify-between flex bg-[#3366CC]">
                <div className="">
                    <a className="btn btn-ghost text-2xl text-white font-bold uppercase">CyberCraft Bangladesh</a>
                </div>
                <input type="text" placeholder="Search" className="input input-bordered w-1/3" />
            </div>
        </div>
    );
};

export default Navbar;