export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const formData = await request.formData();
      const data = {
        name:    formData.get("name") || "未入力",
        kana:    formData.get("kana") || "未入力",
        email:   formData.get("email") || "未入力",
        tel:     formData.get("tel") || "未入力",
        item:    formData.get("item") || "未入力",
        message: formData.get("message") || "未入力",
      };

      // メール本文の作成
      const mailBody = `ホームページよりお問い合わせがありました。\n\n` +
                       `【お名前】: ${data.name} (${data.kana})\n` +
                       `【メール】: ${data.email}\n` +
                       `【電話番号】: ${data.tel}\n` +
                       `【項目】: ${data.item}\n` +
                       `【内容】:\n${data.message}\n`;

      // MailChannels で送信
      const sendRequest = await fetch("https://api.mailchannels.net/tx/v1/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: "breaking_vision@yahoo.co.jp" }] }],
          from: { email: "info@morozumi.jp", name: "株式会社 両角佛壇 HP" },
          subject: "【ホームページ】お問い合わせがありました",
          content: [{ type: "text/plain", value: mailBody }],
        }),
      });

      if (sendRequest.ok) {
        // 送信成功時：thanks.html へリダイレクト
        // ★移管後の本番ドメインに合わせてURLを修正してください
        return Response.redirect("https://morozumi-site.pages.dev/thanks.html", 303);
      } else {
        return new Response("送信失敗。MailChannelsの設定を確認してください。", { status: 500 });
      }

    } catch (e) {
      return new Response("エラー: " + e.message, { status: 500 });
    }
  }
};