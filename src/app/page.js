import Hero from "./components/layout/Hero"
import HomeMenu from "./components/layout/HomeMenu"
import SectionHeaders from "./components/layout/SectionHeaders"
export default function Home() {
  return (
    <>
      
      <Hero  />
      <HomeMenu />
      <section className="text-center my-16 " id="about">
      <hr />
        <SectionHeaders subHeader={'OUR STORY'} mainHeader={'About Us'}/>
      <hr />
      <div className="max-w-md mx-auto mt-5  text-gray-700 flex flex-col gap-4">
        <p >At Foodish, we believe in the extraordinary power of food to bring people together, evoke cherished memories, and create joyous moments. Our culinary journey started with a simple yet profound vision - to be more than just a food website; we aspire to be your trusted companion in exploring the diverse world of flavors.</p>
        <p >At the heart of Foodish lies a deep appreciation for the art of cooking and a commitment to sharing the richness of culinary experiences. We are on a mission to inspire your inner chef, tantalize your taste buds, and guide you through a gastronomic adventure that transcends borders.</p>
        <p >Foodish is not just a collection of recipes a celebration of a culinary lifestyle. Discover articles on food trends, kitchen hacks, and stories behind your favorite dishes. Immerse yourself in our blog that showcases the vibrant tapestry of food cultures, traditions, and the incredible people who make the culinary world so fascinating.</p>
      </div>
        
      </section>
      <section className="text-center my-10" id="contact">
          <hr />
          <SectionHeaders subHeader={'Don\'t Hesitate'} mainHeader={'Contact Us'}/>
          <a className="text-3xl text underline" href="tel:+9187150636565">+9187150636565</a>
      </section>

      
      

    </>
  )
}
