export default function BlockHeader({ title }: { title: string }) {
    return (
        <>
            <div className="desktop-only">
                <div className="border-t-gray-700 border-t border-solid">
                    <div className="border-t-cssa-gold border-t-4 border-solid w-fit">
                        <h3 className="pt-4">{title}</h3>
                    </div>
                </div>
            </div>
            <div className="mobile-only">

            </div>
        </>
    );
}
