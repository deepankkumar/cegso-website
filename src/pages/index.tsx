import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import emailjs from 'emailjs-com';

import {
  ChevronRight,
  Building,
  HardHat,
  Globe,
  SearchCheck,
  Users,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Events Organized", value: "2+" },
  { label: "Active Members", value: "10+" },
  { label: "Founding Year", value: "2024" },
];

const team = [
  {
    name: "Deepank Singh",
    role: "President",
    image: "/assets/Deepank.jpeg",
    linkedIn: "https://www.linkedin.com/in/dksin/",
  },
  {
    name: "Taiwo Adebiyi",
    role: "Vice President",
    image: "/assets/Taiwo.jpeg",
    linkedIn: "https://www.linkedin.com/in/taiwo-adebiyi-055750174/",
  },
  {
    name: "Abdul Wahid Mangi",
    role: "Treasurer",
    image: "/assets/Wahid.jpeg",
    linkedIn: "https://www.linkedin.com/in/wahid-abdul/",
  },
  {
    name: "Asad Ur Rahman",
    role: "Secretary",
    image: "/assets/Asad.jpeg",
    linkedIn: "https://www.linkedin.com/in/asad-ur-rahman-a62989aa/",
  },
  {
    name: "Abdulrahman Salah ",
    role: "Media Manager",
    image: "/assets/Salah.jpeg",
    linkedIn: "https://www.linkedin.com/in/engbinsalah/",
  }
  // Add more team members here
];

const services = [
  {
    service: "Alumni Talks",
    description:
      "Inviting alumni to share their experiences and insights with students.",
    icon: Users,
  },
  {
    service: "Research Seminars",
    description:
      "Helping students prepare for and present research seminars, including practice sessions and Q&A preparation.",
    icon: SearchCheck,
  },
  {
    service: "Townhall Meetings",
    description:
      "Once a semester teacher-student townhall meetings for open discussions and feedback.",
    icon: Building,
  },
  {
    service: "Community Platforms",
    description:
      "Discord/WhatsApp platforms with multiple channels for industry-student interaction, Q&A, research, internships, thesis discussions, and more.",
    icon: Globe,
  },
  {
    service: "Game Room",
    description:
      "Organizing fun activities and games to foster camaraderie among students.",
    icon: HardHat,
  },
  {
    service: "Inter-Lab Get-Togethers",
    description:
      "Fun inter-lab events like potlucks to encourage bonding and collaboration.",
    icon: Users,
  },
  {
    service: "Student Mentorship Program",
    description:
      "A mentorship program pairing new students with experienced mentors for guidance.",
    icon: HardHat,
  },
];


export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState('');
  // Function to handle changes in the form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await emailjs.send(
        'service_ijwqk7e', // Replace with your EmailJS Service ID
        'template_te6untn', // Replace with your EmailJS Template ID
        {
          ...formData,
          reply_to: formData.email, // This sets the reply-to field
        },
        'M7NqWOV1Hrc9RsRUT' // Replace with your EmailJS User ID
      );

      if (result.text === 'OK') {
        setStatus('Message sent successfully!');
      } else {
        setStatus('Message failed to send. Please try again.');
      }

      // Clear form fields
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error('An error occurred:', error);
      setStatus('Message failed to send. Please try again.');
    }
  };
  useEffect(() => {
    // Inject the Lightwidget script dynamically
    const script = document.createElement('script');
    script.src = 'https://cdn.lightwidget.com/widgets/lightwidget.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);
  
  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <span className={styles.pill}>Civil Engineering</span>
              <span className={styles.pill}>Graduate Students</span>
              <span className={styles.pill}>Career</span>
              <span className={styles.pill}>Community</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Welcome to
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  CEGSO.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                The Civil Engineering Graduate Student Organization at the University of Houston (UH).
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="mailto:cegsoatuh@gmail.com" passHref>
                <Button
                onClick={() => scrollTo(document.querySelector("#contact"))}
                >
                  Contact Us <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn More
              </Button>
              <Button
                variant="outline"
                onClick={() => window.location.href = '/Join'}
                className="flex items-center space-x-2"
              >
                <i className="fas fa-user-plus"></i>
                <span>Join CEGSO</span>
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-14 w xl:mt-0"
          >
            {/* CEGSO_home */}
            <div
              data-scroll
              data-scroll-speed="-.01"
              id={styles["canvas-container"]}
              className="mt-14 h-full w-full xl:mt-0"
              style={{ border: 'none', padding: 90 }} 
            >
              <Image
                src="/assets/cegso_home_5_tr.png" // Replace with your image path
                alt="CEGSO"
                layout="responsive"
                width={400}  // Adjust width to your needs
                height={400} // Adjust height to your needs
                quality={100} // Adjust image quality if needed
                className="rounded-md" // Add any additional styling classes
              />
            </div>

          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16  pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
            We are the Civil Engineering Graduate Student Organization (CEGSO), founded in 2024 at the University of Houston, with the mission to advance the academic and professional development of civil engineering graduate students. Our organization is committed to fostering a collaborative community by organizing seminars, workshops, and conferences that provide valuable insights into the latest developments in the field. Additionally, we facilitate networking opportunities with industry professionals and alumni, supporting our members in building connections that are crucial for their professional growth.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              👥 Meet the Team
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
            Our Dedicated Leaders.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
            Meet the people who are driving our organization forward.
            </p>

            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {team.map((member) => (
                    <CarouselItem key={member.name} className="md:basis-1/5">
                      <Card id="tilt" className="flex flex-col items-center">
                        <CardHeader className="p-0">
                          <Image
                            src={member.image}
                            alt={member.name}
                            width={150}
                            height={150}
                            quality={100}
                            className="rounded-full"
                            style={{ marginTop: '20px' }}
                          />
                        </CardHeader>
                        <CardContent className="flex flex-col items-center mt-4">
                          <CardTitle className="text-lg font-semibold">
                            {member.name}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {member.role}
                          </p>
                          <Link href={member.linkedIn} target="_blank" passHref>
                            <Button variant="link" className="mt-2">
                              LinkedIn Profile
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  How can we help?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    We’ve got you covered.
                  </span>
                </h2>
                <p className="text-lg tracking-tight text-foreground">
                  CEGSO offers a range of activites designed to support civil engineering students in their academic and professional journey. Here’s what we offer:
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
        
        <section id="gallery" className="my-64">
        <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl text-center mb-8">
          Follow us on{" "}     
          <a href="https://www.instagram.com/cegsoatuh" target="_blank" rel="noopener noreferrer" className="text-gradient clash-grotesk">
           Instagram
          </a>
        </h2>
        <div className="container mx-auto">
          <iframe
            src="//lightwidget.com/widgets/0d468155b0cd583fa9f7c49a04856222.html"
            
            
            className="lightwidget-widget"
            style={{ width: "100%", border: 0, overflow: "hidden", aspectRatio: "1 / 1" }}
          ></iframe>
        </div>
      </section>
        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
      <div
        data-scroll
        data-scroll-speed=".4"
        data-scroll-position="top"
        className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
      >
        <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
          Reach <span className="text-gradient clash-grotesk">Out</span>
        </h2>
        <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
          We’d love to hear from you! Whether you have a question, want to get involved, or just want to say hello, feel free to reach out using the form below or directly at <a href="mailto:cegsoatuh@gmail.com" className="text-primary underline">cegsoatuh@gmail.com</a>.
        </p>
        <div className="flex space-x-4 mt-4">
          
        </div>
        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-lg text-left">
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Send Message
            </Button>
          </div>
        </form>

        {status && <p className="mt-4 text-white">{status}</p>}
      </div>
    </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
