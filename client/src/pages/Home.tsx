import HeroSection from "../components/HeroSection";
import { BsFillLightningChargeFill, BsShieldFillCheck } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

function Home(): JSX.Element {
    return (
        <div>
            <HeroSection />
            <div className="mt-32 flex justify-between gap-10">
                <div className="flex w-1/3 gap-3">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-green-200">
                        <BsFillLightningChargeFill color={"green"} size={18} />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Fast Delivery</h1>
                        <p className="text-sm text-gray-400">
                            Get your favorite books delivered to your doorstep quickly with delivery
                            service.
                        </p>
                    </div>
                </div>
                <div className="flex w-1/3 gap-3">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-green-200">
                        <BsShieldFillCheck color={"green"} size={18} />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Secure Payments</h1>
                        <p className="text-sm text-gray-400">
                            Shop knowing that your transactions are protected by our secure payment
                            system.
                        </p>
                    </div>
                </div>
                <div className="flex w-1/3 gap-3">
                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-green-200">
                        <AiFillStar color={"green"} size={18} />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">High Quality</h1>
                        <p className="text-sm text-gray-400">
                            Discover a top-notch books that guarantee a rich reading experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
