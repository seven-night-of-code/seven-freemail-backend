export const contrib = async (req, res) => {
    try {
        let request = await fetch(`https://api.github.com/repos/seven-night-of-code/seven-freemail-website/contributors?per_page=100&page=${1}`)    
          const apiResponseJson = await request.json()
  
      console.log(apiResponseJson)
      res.send('Running')
    } catch (err) {
      console.log(err)
      res.status(500).send('Something went wrong')
    }
  }