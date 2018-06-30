module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias("baseHero", "layouts/baseHero.njk");
  eleventyConfig.addLayoutAlias("baseNavBar", "layouts/baseNavBar.njk");
  eleventyConfig.addLayoutAlias("page", "layouts/page.njk");
  eleventyConfig.addLayoutAlias("episode", "layouts/episode.njk");

  eleventyConfig.addCollection("episodes", function(collection) {
    let episodes = collection.getFilteredByTag("episode");
    
    console.log(`first url: ${episodes[0].url}`)

    let episodesReverse = Object.assign([], episodes);
    episodesReverse.reverse();

    let buildLinkModel = episode => {
      if (!episode) {
        return undefined;
      }

      let url = episode.url;
      let title = episode.data.title;
      let number = episode.data.number;
      let season = episode.data.season;
      
      console.log(`number: ${number}, url: ${url}`);

      return {url, title, number, season};
    };

    // add episode data
    for (let i = 0; i < episodes.length; i++) {
      // previous episode
      episodes[i].data.previous = buildLinkModel(episodes[i - 1]);

      // next episode
      episodes[i].data.next = buildLinkModel(episodes[i + 1]);
    }
    
    return episodes;
  });

  return {
    templateFormats: [
      "html",
      "md",
      "njk",
      "ico",
      "png",
      "svg",
      "webmanifest",
      "xml"
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};