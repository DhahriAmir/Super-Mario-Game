// const  {createImage} = require("../js/main");
const mockCreateImage = jest.fn((imgSrc)=>`<img src="${imgSrc}">`)
//Start Mock Section 
describe("Chcek The Exictance Of Sprites" ,()=>{
    test("Test The Exsitence Of Background Sprite" , ()=>{
        expect(mockCreateImage(`../sprites/background.png`)).toBe(`<img src="../sprites/background.png">`)
    })
    test("Test The Exsitence Of spriteStandRight Sprite" , ()=>{
        expect(mockCreateImage(`../sprites/spriteStandRight.png`)).toBe(`<img src="../sprites/spriteStandRight.png">`)
    })
    test("Test The Exsitence Of spriteStandLeft Sprite" , ()=>{
        expect(mockCreateImage(`../sprites/spriteStandLeft.png`)).toBe(`<img src="../sprites/spriteStandLeft.png">`)
    })
    test("Test The Exsitence Of spriteRunRight Sprite" , ()=>{
        expect(mockCreateImage(`../sprites/spriteRunRight.png`)).toBe(`<img src="../sprites/spriteRunRight.png">`)
    })
    test("Test The Exsitence Of spriteRunLeft Sprite" , ()=>{
        expect(mockCreateImage(`../sprites/spriteRunLeft.png`)).toBe(`<img src="../sprites/spriteRunLeft.png">`)
    })
})
//End Mock Section 