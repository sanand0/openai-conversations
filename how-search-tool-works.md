# How Search Works

Here's what happens when you ask, for example, ["What is the temperature like in Seoul in early October?"](https://chatgpt.com/share/67504282-e08c-800c-9585-925664ff85b5)
([JSON](./samples/seoul-weather-early-october.json)) with search enabled:

- ChatGPT sent an assistant message content `{content_type: "code", text: "search(...)"}` with `{recipient: "browser"}`
  - Here, ChatGPT ran `search("average temperature in Seoul early October")`
  - This search is performed on `bing.com`. This is not mentioned in the conversation JSON but is shown in the ChatGPT UI.
- The `browser` tool sent a tool message content `{content_type: "tether_browsing_display", result: "..."}`. The result uses unicode to format, like `【{index}†{title}source】`:
  ```
  # 【0†Seoul October Weather, Average Temperature (South Korea) - Weather Spark†weatherspark.com】
  October Weather in Seoul South Korea. Daily high temperatures decrease by 13°F, from 72°F to 59°F, rarely falling below 50°F or exceeding 78°F.. Daily low temperatures decrease by 12°F, from 57°F to 45°F, rarely falling below 36°F or exceeding 63°F.. For reference, on August 3, the hottest day of the year, temperatures in Seoul typically range from 75°F to 85°F, while on January 18 ...
  # 【1†Seoul Weather in October, South Korea - Holiday Weather†www.holiday-weather.com】
  October weather averages for Seoul, South Korea. Temperature, High temperature, Low temperature, Precipitation, Daily sun hours.
  ...
  ``
  ```
- The `browser` tool result is also available as JSON in `message.metadata._cite_metadata.metadata_list[]` as a list of `{type, title, url, text, pub_date, extra}`. This clearly has more details than the `result` above, such as the date and the full URL.
  - The search results display shows the site URLs -- and their favicons and titles, which are fetched by the ChatGPT UI, not part of the JSON.
- The `assistant` sends a message `{content_type: "code", text: "mclick([... INDICES ...])"` to "click" on specific search indices, e.g. `mclick([0, 3, 2, 9, 1])`. These are not sequential. They might be in order of relevance.
  - Note: ChatGPT uses the search snippet to identify relevance before fetching the page contents.
- The `browser` tool returns a series of messages (one per `mclick`) with content `{content_type: "tether_quote", url, domain, text, title}`. See [a sample page](#sample-page) below.
  - The full page is not returned. Only a relevant chunk of the page.
  - Links are formatted as `【{index}†{text}】` - making it easy to click a specific link. Identical links have the same index.
- The `assistant` answers the questions from these results. It also includes
  - `content.parts[0]` which has the text of the answer. The answer includes references like `【7†source】`.
  - `metadata.content_references[]` is a list of reference objects. These replace text in the source with a content reference.
    - `matched_text`: "【7†source】", `start_idx`: 319, `end_idx`: 329 -- these indicate where to insert the reference.
    - `url`, `title`, `snippet` have the link and text to display.
  - `metadata.citations[]`: This appears to have the same information as `metadata.content_references[]`, formatted differently.

### Sample page

- `url`: https://weather-and-climate.com/Seoul-October-averages
- `domain`: weather-and-climate.com
- `title`: Seoul Weather in October: Temperature, Rainfall, & More

```
If you favor pleasant temperatures and minimal rainfall, October is one of the better months to visit Seoul. 【12†May】 and 【5†October】 typically offer the most agreeable circumstances. On the other hand, 【8†January】, 【14†July】, 【15†August】 and 【17†December】 tend to be characterized by conditions that may not be as optimal.

For an in-depth look at the yearly conditions, visit our specialized 【4†Seoul climate page with graphs】.

### Monthly Averages - Seoul

  * 【8†January】
  * 【9†February】
  * 【10†March】
  * 【11†April】

  * 【12†May】
  * 【13†June】
  * 【14†July】
  * 【15†August】

  * 【16†September】
  * 【5†October】
  * 【7†November】
  * 【17†December】

## Seoul, monthly averages in October

[Image 3: Min Temperature]Min Temperature 9°C  

[Image 4: Max Temperature]Max Temperature 21°C  

[Image 5: Chance of Rain]Chance of Rain 22%  

[Image 6: Precipitation]Precipitation 55 mm  

[Image 7: Rainy days]Rainy days 7 days  

[Image 8: Humidity]Humidity 62%  

[Image 9: Windspeed]Windspeed 7 km/h  

[Image 10: Sunshine]Sunshine 207 hours  

[Image 11: Percentage Sunshine]Percentage Sunshine 59%  

## Where to go in South Korea in October

Find out more about the weather in South Korea and which places have the best travel conditions in this month.

【18†Weather conditions】  【18†Weather】

【19†Temperatures】

【20†Precipitation】

Map not visible? Whoops sorry! Please refresh the page.

Legend [Image 12] perfect weather [Image 13] pleasant [Image 14] tolerable [Image 15] unpleasant [Image 16] poor

Perfect weather is subjective. On this map perfect weather has been defined with temperatures between 20°C and 29°C and not too much precipitation (less than 90 mm a month).

## So, what should you wear in this month?

For visitors traveling to Seoul, we recommend wearing layers. So maybe a skirt, t-shirt, shorts for during the day and jeans and a warm jacket for some days and evenings. Bring a rain jacket in case it rains during your stay. Plan on layering your clothes.

## What To Do

We rated the following activities from 1 (least suitable) to 10 (best) to do.

Cycling

10/10

Walking

10/10

Barbeque

9/10

Camping

4/10

Outdoor sports

10/10

## Interested in more climate information?

This site provides you with all the information you need about the climate in 【4†Seoul】.

Our site offers climate and forecast data for 【0†every country】 in the world. Are you going to 【3†South Korea】? On this website you can find historical weather averages for 【3†many cities in South Korea】. Not sure yet where to go? We now have a tool which recommends destinations that suit your ideal travel conditions. 【2†Find out where to go with our weather planner】.

### Monthly Averages

  * 【8†January】
  * 【9†February】
  * 【10†March】
  * 【11†April】

  * 【12†May】
  * 【13†June】
  * 【14†July】
  * 【15†August】

  * 【16†September】
  * 【5†October】
  * 【7†November】
  * 【17†December】

### Seoul Today

【6†Weather Forecast】

【16†September averages】

【5†October averages】

【4†Annual averages】

### Popular in October

Average temperatures in October

  * 【21† Chiang Mai 32°C 】
  * 【22† Alexandria 29°C 】
  * 【23† Denpasar 28°C 】
  * 【24† Las Vegas 27°C 】
  * 【25† Oaxaca de Juárez 25°C 】
  * 【26† Alanya 24°C 】
  * 【27† Katmandu 24°C 】
  * 【28† Palermo 24°C 】
  * 【29† Lisbon 22°C 】
  * 【30† Seogwipo 22°C 】
  * 【31† Busan 22°C 】
  * 【32† San Francisco 22°C 】
  * 【33† Madrid 22°C 】
  * 【34† Saint-Tropez 21°C 】
  * 【35† Jeju 21°C 】
  * 【5† Seoul 21°C 】
  * 【36† Santiago 21°C 】
  * 【37† Cape Town 20°C 】
  * 【38† Incheon 20°C 】

### Averages & Climate

Want to know more about historical conditions?

【4† 】 【4†Climate Seoul】

### Travel Inspiration

【39† 】

【39† Mud festival in South Korea In July, the peaceful seaside town of Boryeong turned into a chaos of mud for 9 days. We recommend putting this festival on your bucket list.
```
