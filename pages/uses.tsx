import Container from 'components/Container'
import Image from 'next/future/image'

export default function Uses() {
    return (
        <Container
            title="Uses – Vasilis Totskas"
            description="Here's what tech I'm currently using for coding, videos, and music."
        >
            <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
                <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
                    My Gear
                </h1>
                <p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
                    Here's what tech I'm currently using for coding, videos, and
                    music. Most of these have been accumulated over the past few
                    years, with a recent office upgrade in 2020.
                </p>
                <Image
                    className="rounded-lg"
                    alt={`My computer desk`}
                    src={`/static/images/setup.png`}
                    width={2164 / 2}
                    height={1546 / 2}
                    priority
                />
                <div className="prose dark:prose-dark w-full">
                    <h3 id="computer-office">Computer / Office</h3>
                    <ul>
                        <li>Intel(R) Core(TM) i5-8400 CPU @ 2.80GHz   2.81 GHz</li>
                        <li>32.0 GB 3200Hz</li>
                        <li>Samsung 970 Evo Plus SSD 1TB M.2 NVMe PCI Express 3.0</li>
                        <li>MSI GeForce GTX 1050 Ti 4GB GDDR5</li>
                        <li>MSI Optix MAG274R IPS HDR Gaming Monitor 27" FHD 1920x1080 144Hz 1ms GTG</li>
                        <li>Razer DeathAdder Elite</li>
                        <li>Razer BlackWidow Chroma v2 Keyboard</li>
                        <li>Genius SW-G2.1</li>
                        <li>Autonomous ErgoChair</li>
                    </ul>
                    <h3 id="coding">Coding</h3>
                    <ul>
                        <li>Editor: JetBrains WebStorm for JavaScript</li>
                        <li>Terminal: Command bash / Git bash / PowerShell</li>
                    </ul>
                    <h3 id="software">Software</h3>
                    <ul>
                        <li>JetBrains Studio</li>
                        <li>SourceTree</li>
                        <li>Docker</li>
                        <li>WampServer64</li>
                        <li>Heidi</li>
                        <li>WinSCP</li>
                        <li>Notepad++</li>
                    </ul>
                </div>
            </article>
        </Container>
    )
}
