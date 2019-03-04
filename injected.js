/**
 * Created by Yunzhe on 2019/3/3.
 */

'use strict';

const openResource = path => {
    const readTexture =  (gl, texture, width, height) => {
        // Create a framebuffer backed by the texture
        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

        // Read the contents of the framebuffer
        const data = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);

        gl.deleteFramebuffer(framebuffer);

        // Create a 2D canvas to store the result
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        // Copy the pixels to a 2D canvas
        const imageData = context.createImageData(width, height);
        imageData.data.set(data);
        context.putImageData(imageData, 0, 0);

        // var img = new Image();
        // img.src = canvas.toDataURL();

        return canvas.toDataURL();
    }

    const readImage = img => {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        return canvas.toDataURL();
    }

    const res = Laya.loader.getRes(path);

    const texture = res.bitmap._source;

    const context = Laya.Render.canvas.getContext('webgl');

    const win = window.open('', path, `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${res.sourceWidth + 20},height=${res.sourceHeight + 20},top=${screen.height / 2},left=${screen.width / 2}`);

    win.document.body.innerHTML = `<div><img src="${
        res.bitmap._image ? readImage(res.bitmap._image) :
        readTexture(context, texture, res.sourceWidth, res.sourceHeight)
    }" /></div>`;
};

const intervalId = setInterval(() => {
    if (window.uiscript && window.uiscript.UI_Win) {
        clearInterval(intervalId);
        console.log('Laya found');
        main();
    } else {
        console.log('Laya not ready');
    }
}, 1000);

const main = () => {
    const Laya = window.Laya;
    const game = window.game;

    document.addEventListener('Helper:Test', e => {
        console.log(e);
    });
    document.dispatchEvent(new CustomEvent('Helper:Initialized'));

    // Prefetch all resources
    let once = false;
    let finishCount = 0;
    game.LoadMgr.loadRes = new Proxy(game.LoadMgr.loadRes, {
        apply (target, ctx, args) {
            if (!once) {
                once = true;
                ['common', 'scene_mj', 'lobby', 'ui_mj', 'entrance'].forEach(type => {
                    game.LoadMgr.loadRes(game.E_LoadType[type], Laya.Handler.create(this, () => {
                        finishCount += 1;
                        if (finishCount === 5) {
                            console.log('Resources have been pre-fetched!');
                            console.log(game.LoadMgr._items);
                            // openResource('myres/entrance/login.png');
                        }
                    }));
                });
            }
            return Reflect.apply(...arguments);
        },
    });
};