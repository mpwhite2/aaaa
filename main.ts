enum SpriteKindLegacy {
    Player,
    Projectile,
    Food,
    Enemy
}
enum ActionKind {
    Walking,
    Idle,
    Jumping
}
function rotatePlayer (playerSprite: Sprite, direction: number) {
    transformSprites.changeRotation(playerSprite, direction)
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    A(Ship)
})
function A (mySprite: Sprite) {
    // Zero rotation represents north; adjust to correct polar angle.
    thrustDir = transformSprites.getRotation(mySprite) - 90
    thrustDirRads = thrustDir * 3.1416 / 180
    thrustX = THRUSTER_VELOCITY * Math.cos(thrustDirRads)
    thrustY = THRUSTER_VELOCITY * Math.sin(thrustDirRads)
    mySprite.vx += thrustX
    mySprite.vy += thrustY
    mySprite.startEffect(effects.fire, 500)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    fireTorpedo(Ship)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    rotatePlayer(Ship, -30)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprite.destroy(effects.disintegrate, 500)
    otherSprite.destroy(effects.disintegrate, 500)
    info.changeScoreBy(1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    rotatePlayer(Ship, 30)
})
function fireTorpedo (playerSprite: Sprite) {
    // 0 degrees is north; adjust to correct polar angle.
    torpedoDir = transformSprites.getRotation(playerSprite) - 90
    torpedoDirRads = torpedoDir * (3.1416 / 180)
    torpedoVx = TORPEDO_SPEED * Math.cos(torpedoDirRads)
    torpedoVy = TORPEDO_SPEED * Math.sin(torpedoDirRads)
    // Give the torpedo a head start so the player doesn't blow up. :-)
    torpedoDx = 16 * Math.cos(torpedoDirRads)
    torpedoDy = 16 * Math.sin(torpedoDirRads)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . 7 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, playerSprite, torpedoVx, torpedoVy)
    music.pewPew.play()
}
let projectile2: Sprite = null
let projectile: Sprite = null
let torpedoDy = 0
let torpedoDx = 0
let torpedoVy = 0
let torpedoVx = 0
let torpedoDirRads = 0
let torpedoDir = 0
let thrustY = 0
let thrustX = 0
let thrustDirRads = 0
let thrustDir = 0
let TORPEDO_SPEED = 0
let THRUSTER_VELOCITY = 0
let Ship: Sprite = null
Ship = sprites.create(img`
    . . . . . . . 7 7 . . . . . . . 
    . . . . . . . 7 7 . . . . . . . 
    . . . . . . . 7 7 . . . . . . . 
    . . . . . . . 7 7 . . . . . . . 
    . . . . . . . 2 2 . . . . . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . . 2 2 2 2 . . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    . . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
    . 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
    `, SpriteKind.Player)
scaling.scaleByPercent(Ship, -50, ScaleDirection.Uniformly, ScaleAnchor.Middle)
let list = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . c c c . . . . . . 
    . . . . . . a b a a . . . . . . 
    . . . . . c b a f c a c . . . . 
    . . . . c b b b f f a c c . . . 
    . . . . b b f a b b a a c . . . 
    . . . . c b f f b a f c a . . . 
    . . . . . c a a c b b a . . . . 
    . . . . . . c c c c . . . . . . 
    . . . . . . . c . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . c c . . . . . . 
    . . . . . c a a a a . . . . . . 
    . . . . . a a f f b a . . . . . 
    . . . . c a b f f c b . . . . . 
    . . . . c b b b a f c b . . . . 
    . . . . c b a c a b b b . . . . 
    . . . . . b b f f a a c . . . . 
    . . . . . . a a b b c . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . c c 8 . . . . 
    . . . . . . 8 c c c f 8 c c . . 
    . . . c c 8 8 f c a f f f c c . 
    . . c c c f f f c a a f f c c c 
    8 c c c f f f f c c a a c 8 c c 
    c c c b f f f 8 a c c a a a c c 
    c a a b b 8 a b c c c c c c c c 
    a f c a a b b a c c c c c f f c 
    a 8 f c a a c c a c a c f f f c 
    c a 8 a a c c c c a a f f f 8 a 
    . a c a a c f f a a b 8 f f c a 
    . . c c b a f f f a b b c c 6 c 
    . . . c b b a f f 6 6 a b 6 c . 
    . . . c c b b b 6 6 a c c c c . 
    . . . . c c a b b c c c . . . . 
    . . . . . c c c c c c . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . c c c c . . 
    . c c c c c . c c c c c f c c . 
    c c a c c c c c 8 f f c f f c c 
    c a f a a c c a f f c a a f f c 
    c a 8 f a a c a c c c a a a a c 
    c b c f a a a a a c c c c c c c 
    c b b a a c f 8 a c c c 8 c c c 
    . c b b a b c f a a a 8 8 c c . 
    . . . . a a b b b a a 8 a c . . 
    . . . . c b c a a c c b . . . . 
    . . . . b b c c a b b a . . . . 
    . . . . b b a b a 6 a . . . . . 
    . . . . c b b b 6 6 c . . . . . 
    . . . . . c a 6 6 b c . . . . . 
    . . . . . . . c c c . . . . . . 
    `,
img`
    . . . . . . c c c . . . . . . . 
    . . . . . a a a c c c . . . . . 
    . . . c a c f a a a a c . . . . 
    . . c a c f f f a f f a c . . . 
    . c c a c c f a a c f f a c . . 
    . a b a a c 6 a a c c f a c c c 
    . a b b b 6 a b b a a c a f f c 
    . . a b b a f f b b a a c f f c 
    c . a a a c c f c b a a c f a c 
    c c a a a c c a a a b b a c a c 
    a c a b b a a 6 a b b 6 b b c . 
    b a c b b b 6 b c . c c a c . . 
    b a c c a b b a c . . . . . . . 
    b b a c a b a a . . . . . . . . 
    a b 6 b b a c . . . . . . . . . 
    . a a b c . . . . . . . . . . . 
    `,
img`
    . . . . . . . . c c c c . . . . 
    . . . . c c c c c c c c c . . . 
    . . . c f c c a a a a c a c . . 
    . . c c f f f f a a a c a a c . 
    . . c c a f f c a a f f f a a c 
    . . c c a a a a b c f f f a a c 
    . c c c c a c c b a f c a a c c 
    c a f f c c c a b b 6 b b b c c 
    c a f f f f c c c 6 b b b a a c 
    c a a c f f c a 6 6 b b b a a c 
    c c b a a a a b 6 b b a b b a . 
    . c c b b b b b b b a c c b a . 
    . . c c c b c c c b a a b c . . 
    . . . . c b a c c b b b c . . . 
    . . . . c b b a a 6 b c . . . . 
    . . . . . . b 6 6 c c . . . . . 
    `
]
THRUSTER_VELOCITY = 10
TORPEDO_SPEED = 100
forever(function () {
    if (Ship.x < 0 || Ship.x > 160) {
        if (Ship.x < 50) {
            Ship.x = 160
        } else {
            Ship.x = 0
        }
    }
    if (Ship.y < 0 || Ship.y > 120) {
        if (Ship.y < 50) {
            Ship.y = 120
        } else {
            Ship.y = 0
        }
    }
})
game.onUpdateInterval(500, function () {
    projectile2 = sprites.createProjectileFromSide(list[randint(0, list.length - 1)], randint(-50, 50), randint(-50, 50))
})
