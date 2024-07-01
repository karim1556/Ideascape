import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className = "w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br/>
        <span className="orange_gradient text center">
            AI-Powered Prompts
        </span>
      </h1>
      <p className="desc text-center">
      IdeaScape is a cutting-edge, open-source AI tool for today's world, offering the ability to explore, create, and circulate innovative prompts.
      </p>
      <Feed/>
    </section>
  )
}

export default Home
