export default function Footer() {
    return (
        <div className="flex flex-col w-full h-fit bg-[#374151] text-[#f3f3f3] px-14 py-14">
            <div className="flex flex-row justify-start">
                <div className="flex flex-col gap-2 justify-center w-fit">
                    <div className="flex items-center w-full gap-4">
                        <svg className="text-primary-600 w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <div className="text-5xl font-bold ">PakSafe</div>
                    </div>
                </div>
            </div>
            <div className="w-full border-t border-gray-500 my-8"></div>
            <div className="text-center">© 2025 PakSafe - All rights reserved.</div>
        </div>
    );
}