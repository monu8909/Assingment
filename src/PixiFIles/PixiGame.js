import React, { useRef, useEffect } from "react";
import * as PIXI from "pixi.js";

const PixiGame = () => {
  const containerRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    // Prevent double initialization
    if (appRef.current || !containerRef.current) return;

    // ✅ Initialize PixiJS Application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    // ✅ Append the canvas to the container
    containerRef.current.appendChild(app.view);
    appRef.current = app;

    // Player
    const player = new PIXI.Graphics();
    player.beginFill(0xffffff);
    player.drawRect(0, 0, 100, 20);
    player.endFill();
    player.x = 350;
    player.y = 550;
    app.stage.addChild(player);

    // Ball
    const ball = new PIXI.Graphics();
    ball.beginFill(0xff0000);
    ball.drawCircle(0, 0, 15);
    ball.endFill();
    ball.x = Math.random() * 800;
    ball.y = 0;
    app.stage.addChild(ball);

    let left = false;
    let right = false;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") left = true;
      if (e.key === "ArrowRight") right = true;
    };
    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft") left = false;
      if (e.key === "ArrowRight") right = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    app.ticker.add(() => {
      if (left) player.x -= 5;
      if (right) player.x += 5;
      player.x = Math.max(0, Math.min(app.view.width - 100, player.x));

      ball.y += 5;

      if (ball.y > 550 && ball.x > player.x && ball.x < player.x + 100) {
        ball.y = 0;
        ball.x = Math.random() * 800;
      }

      if (ball.y > 600) {
        ball.y = 0;
        ball.x = Math.random() * 800;
      }
    });

    // ✅ Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      app.destroy(true, true);
      appRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "800px",
        height: "600px",
        margin: "0 auto",
      }}
    />
  );
};

export default PixiGame;
