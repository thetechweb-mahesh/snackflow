export default function Header() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div className="bg-white border-b h-16 flex items-center justify-between px-6">

            <div>

                <h2 className="font-semibold text-lg">
                    Welcome,
                    {" "}
                    {user?.name}
                </h2>

            </div>

            <div>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                    {user?.role}

                </span>

            </div>

        </div>
    );
}