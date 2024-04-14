const  {createImage} = require("../js/main");

discribe("Chcek The Exictance Of Sprites" ,()=>{
    test("Test The Exsitence Of Background Sprite" , ()=>{
        expect(createImage(`../sprites/background.png`)).toBe(`<img src="../sprites/background.png">`)
    })
    test("Test The Exsitence Of spriteStandRight Sprite" , ()=>{
        expect(createImage(`../sprites/spriteStandRight.png`)).toBe(`<img src="../sprites/spriteStandRight.png">`)
    })
    test("Test The Exsitence Of spriteStandLeft Sprite" , ()=>{
        expect(createImage(`../sprites/spriteStandLeft.png`)).toBe(`<img src="../sprites/spriteStandLeft.png">`)
    })
    test("Test The Exsitence Of spriteRunRight Sprite" , ()=>{
        expect(createImage(`../sprites/spriteRunRight.png`)).toBe(`<img src="../sprites/spriteRunRight.png">`)
    })
    test("Test The Exsitence Of spriteRunLeft Sprite" , ()=>{
        expect(createImage(`../sprites/spriteRunLeft.png`)).toBe(`<img src="../sprites/spriteRunLeft.png">`)
    })
})