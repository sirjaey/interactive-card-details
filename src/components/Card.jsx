function Card({ cardHolder, cardNumber, expDate, cvc }) {
    return (
        <>
            <div className="w-[70%] md:w-full absolute top-10 md:top-115 left-25 md:left-55 h-[100px] flex items-center justify-center">
                <div className="relative">
                    <img
                        src="./images/bg-card-back.png"
                        alt="card-back"
                        className="w-[300px] h-[150px] md:w-full md:h-full"
                    />
                    <div className="absolute top-16 left-50 md:top-28 md:left-90 text-white text-sm">
                        <input
                            type="text"
                            placeholder="000"
                            value={cvc}
                            className="w-full bg-transparent text-[12px] border-none placeholder:gray-300 focus:outline-none focus:ring-0"
                            disabled
                        />
                    </div>
                </div>
            </div>
            <div className="absolute top-25 right-6 md:left-35 w-full md:w-full flex items-center justify-center">
                <div className="relative">
                    <img
                        src="./images/bg-card-front.png"
                        alt="card-front"
                        className="w-[300px] h-[150px] md:w-full md:h-full"
                    />

                    <div className="absolute top-5 left-5 w-[100px] h-[50px] ">
                        <img
                            src="./images/card-logo.svg"
                            alt="card-logo"
                            className="h-6 md:h-10"
                        />
                    </div>
                    <div className="absolute bottom-13 md:bottom-20 w-full left-0 right-0  text-white text-lg ">
                        <input
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            className="w-full 
                                md:text-[20px] md:text-left md:w-full md:tracking-[0.4em] px-6 md:px-6 tracking-[0.15em] bg-transparent border-none text-white placeholder:gray-300 focus:outline-none focus:ring-0"
                            disabled
                        />
                    </div>

                    <div className="absolute bottom-5 left-6 text-white text-sm">
                        <input
                            type="text"
                            placeholder="SIRJAEY ISKING"
                            className="w-full bg-transparent text-[12px] md:text-[14px] border-none placeholder:gray-300 focus:outline-none focus:ring-0"
                            value={cardHolder}
                            disabled
                            onChange={() => {}}
                        />
                    </div>
                    <div className="absolute bottom-5 left-60 md:left-90 text-white text-sm">
                        <input
                            type="text"
                            placeholder="00/00"
                            className="w-full text-[12px] md:text-[14px] bg-transparent border-none placeholder:gray-300 focus:outline-none focus:ring-0"
                            value={expDate}
                            disabled
                            onChange={() => {}}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;