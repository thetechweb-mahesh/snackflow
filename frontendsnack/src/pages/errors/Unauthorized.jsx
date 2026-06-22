export default function Unauthorized() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold">
                    403
                </h1>

                <p className="mt-2">
                    Access Denied
                </p>

                <p className="text-gray-500">
                    You don't have permission
                    to access this page.
                </p>
            </div>
        </div>
    );
}