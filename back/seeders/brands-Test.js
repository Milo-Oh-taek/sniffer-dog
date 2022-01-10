'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('brands', [
      {
        name: "Versace",
        website: "http://www.versace.com",
        use_yn: "Y",
        description: "Versace is an Italian fashion design house founded by the late Gianni Versace and continued by other members of the Versace family after his death. Debuting with a line of women's wear in 1978, the company was an instant success. A men's line and the company's first boutique in Milan followed in that same year.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.97.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Bvlgari",
        website: "http://www.bvlgari.com",
        use_yn: "Y",
        description: "bvlgari is an Italian fashion design house founded by the late Gianni Versace and continued by other members of the Versace family after his death. Debuting with a line of women's wear in 1978, the company was an instant success. A men's line and the company's first boutique in Milan followed in that same year.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Amouage",
        website: "http://www.amouage.com",
        use_yn: "Y",
        description: "His Highness Sayyid Hamad bin Hamoud al bu Said had a dream to restore the great Arabian art of perfumery to the region. Amouage is a luxury perfume house established in Oman in 1983 by the Sultan of Oman. Amouage uses traditional for the Middle East perfume ingredients such as agarwood, incense, musk, rose and spices, but the developers of the scents are perfumeurs from the major fragrances&flavor companies.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "MONTBLANC",
        website: "http://www.MONTBLANC.com",
        use_yn: "Y",
        description: "His Highness Sayyid Hamad bin Hamoud al bu Said had a dream to restore the great Arabian art of perfumery to the region. Amouage is a luxury perfume house established in Oman in 1983 by the Sultan of Oman. Amouage uses traditional for the Middle East perfume ingredients such as agarwood, incense, musk, rose and spices, but the developers of the scents are perfumeurs from the major fragrances&flavor companies.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "calvin Kelin",
        website: "http://www.calvinKelin.com",
        use_yn: "Y",
        description: "Calvin Klein has always remained to be the luxury brand and has been ruling the hearts of the consumers for decades. However they have a successful clothing line, but their perfume line is not less than perfect. Their specific fragrances are preferred by men and women.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Guess",
        website: "http://www.guess.com",
        use_yn: "Y",
        description: "In the fashion industry Guess needs no guesses, but their perfume range is nothing less than up to par..",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Nautica",
        website: "http://www.nautica.com",
        use_yn: "Y",
        description: "Nautica is by far one of the most famous perfume brands. Its range of perfume is famous for a truly masculine and seductive scent. The inclusion of a different combination of green leaf, apple, water lotus, cedarwood, musk, amber, and moss, make the perfumes range from Nautica an excellent choice for regular daywear and casual outfits.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Dolce & Gabbana",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "This very perfume brand is the most favorite amongst both men and women. They have many perfumes, but the Light Blue for women is their most representative one. Their fragrances include notes from roses, apple, jasmine, and musk.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Vera Wang",
        website: "http://www.verawang.com",
        use_yn: "Y",
        description: "Vera Wang needs no introduction and is a known name in the fashion industry. Also, the range is a decent option for regular day wear. It combines discreet sweet and fruity notes. In order to balance the fragrance spice, a tint of sweetness is added.",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Swiss Guard",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "Indeed, the Swiss Guard is a big brand not just due to fragrances, but also due to the fact that they offer affordable, high-quality products. ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Jean-Paul Gaultier",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "Who doesn’t know Jean-Paul Gautier? It is one of the bigger brands when it comes to perfumes for men. Their perfume range is perfect for that casual wear, and holds the fragrance, which has a seductive and masculine tone. ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Sarah Jessica Parker",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "From the time of Sex and the city, Sarah Jessica Parker has carved an oomph factor in the entrainment industry, and with the perfume line, she has traversed her popularity onscreen and venture into various business. ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "BYREDO",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "BYREDO is a Swedish fragrance house that fuses unique cultural references from South Asia. ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Creed",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "Creed, founded by James Creed in 1700s Britain, is another perfumery that used to supply royal families, including Queen Victoria. ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "diptyque",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "diptyque is one of the most popular perfume brands among top retailers.  ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Frederic Malle",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "Frederic Malle comes from generations of perfumery expertise in the family, starting from his grandfather who founded Parfums Christian Dior.  ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Jo Malone",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "Founded in London, Jo Malone is now one of the most recognized perfume brands in the world. ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "Maison Francis Kurkdijan",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: "Francis Kurkdijan graduated from the prestigious perfume school, ISIPCA Versailles. ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "LE LABO",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: " LE LABO is a small company that hand-makes all of their scents in a perfumery lab in New York.  ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },
      {
        name: "ODIN",
        website: "http://www.naver.com",
        use_yn: "Y",
        description: " A multi-brand boutique in New York, ODIN started making their own fragrances in 2009, inspired by the 'exoticism of travel'. Simply named numerically in order of creation, their fragrances are indeed made with exotic places in mind, like the Himayalas, West Indies, Jordan, Japan, Turkey and the Mediterranean.  ",
        pic1: "https://fimgs.net/mdimg/dizajneri/o.14.jpg",
        created_at: new Date,
        updated_at: new Date,
      },


    ]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
