export default function PageHeader({ title, image }: { title: string; image: string }) {
    return (
        <>
            <div className="desktop-only">
                <div
                    className="w-screen h-[500px] bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url('${image}')` }}
                >
                    <div className="w-full h-full bg-opacity-30 bg-black p-12">
                        <div className="container">
                            <h2 className="border-l-4 p-8 border-cssa-gold">{title}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-only flex flex-col gap-4">
                <div className="container">
                    <h2 className="text-3xl">{title}</h2>
                </div>
                <div
                    className="w-full h-48 bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url('${image}')` }}
                ></div>
            </div>
        </>
    );
}
