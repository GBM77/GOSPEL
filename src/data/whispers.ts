export interface WhisperItem {
  id: string;
  reference: string;
  referenceEn: string;
  theme: string;
  category: 'stream' | 'peace' | 'strength' | 'love' | 'guidance' | 'grace' | 'hope';
  chineseText: string;
  englishText: string;
  whisperThought: string;
  whisperThoughtEn: string;
  meditationPrompt: string;
  prayer: string;
  keyDeclaration: string;
  tag: string;
}

export const CATEGORIES: { id: WhisperItem['category'] | 'all'; name: string; icon: string }[] = [
  { id: 'all', name: '全部耳語', icon: 'Sparkles' },
  { id: 'stream', name: '溪水旁的樹', icon: 'Droplets' },
  { id: 'peace', name: '平安安息', icon: 'Feather' },
  { id: 'strength', name: '加力奮起', icon: 'Shield' },
  { id: 'love', name: '慈愛同在', icon: 'Heart' },
  { id: 'guidance', name: '指引明燈', icon: 'Compass' },
  { id: 'grace', name: '夠用恩典', icon: 'Sun' },
  { id: 'hope', name: '未來盼望', icon: 'Anchor' },
];

export const WHISPER_ITEMS: WhisperItem[] = [
  {
    id: 'psalm-1-2-3',
    reference: '詩篇 1:2-3',
    referenceEn: 'Psalm 1:2-3 (ESV)',
    theme: '溪水旁的長青生命 · 晝夜思想的福分',
    category: 'stream',
    chineseText: '唯喜愛耶和華的法則，晝夜思想，此人便為有福！他要像一棵樹栽在溪水旁，按時結果子，葉子也不枯乾。凡他所做的都順利。',
    englishText: 'But his delight is in the law of the Lord, and on his law he meditates day and night. He is like a tree planted by streams of water that yields its fruit in its season, and its leaf does not wither. In all that he does, he prospers.',
    whisperThought: '孩子，在喧囂急促的世事中，不必隨風飄搖。我已將你的生命親手栽在生命活水的泉旁。當你在清晨與黑夜將我的話珍藏在心裡，你的靈魂便在深處扎根。無須焦慮眼前的果子何時結出，你的每一寸成長都有我美麗的時令。在旱熱的年日裡，你的葉子永不枯乾，因泉源是我，你的興盛在我手中。',
    whisperThoughtEn: 'My beloved child, do not be tossed about by the rush of this world. I have planted you beside streams of living water. When you treasure my truth day and night, your roots reach deep into my everlasting love. Do not fret over timing; in my appointed season, your life shall bear sweet fruit, and your leaves will never wither.',
    meditationPrompt: '靜默呼吸片刻，想像樹根深植於清泉之中。思想：今天有哪個重擔你正憑己力硬撐？將它沉浸於天父的泉水裡，享受安息。',
    prayer: '天父，我渴慕祢的話語！願祢的真理成為我心靈的甘泉。除去我的浮躁與焦慮，使我的靈像溪旁的青樹，時常浸潤在祢的愛裡，按時結果，毫無枯乾。阿們。',
    keyDeclaration: '我是栽在溪水旁的繁盛生命，連於天父活泉，葉不枯乾，凡所做的盡都順利！',
    tag: '#詩篇第一篇 #核心思想 #活水之泉 #晝夜默想'
  },
  {
    id: 'isaiah-41-10',
    reference: '以賽亞書 41:10',
    referenceEn: 'Isaiah 41:10 (NIV)',
    theme: '不要害怕 · 我牽著你的右手',
    category: 'strength',
    chineseText: '你不要害怕，因為我與你同在；不要驚惶，因為我是你的神。我必堅固你，我必幫助你；我必用我公義的右手扶持你。',
    englishText: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    whisperThought: '親愛的孩子，看著我，不要看翻騰的風浪。在無助與未知的拐彎處，我的右手正緊緊握著你微顫的手。恐懼是謊言，我的同在才是真實。今天當你感到疲憊軟弱時，只要放手靠在我懷中，我就是你的力量與護庇。',
    whisperThoughtEn: 'Do not look at the storm, my child; look at me. In every unknown corner, my righteous right hand holds you fast. Fear is an illusion; my presence is eternal truth. When you feel frail today, lean into my chest. I will renew your strength.',
    meditationPrompt: '把雙手攤開在膝上，感受天父慈愛的雙手正輕輕托住你。讓肩膀放鬆，放下掌控欲。',
    prayer: '主啊，謝謝祢時刻與我同行。在我感到害怕與不知所措的時候，提醒我握住祢永不動搖的右手。祢是我的神，有祢同在我就不懼怕。阿們。',
    keyDeclaration: '天父與我同在，祂的大能堅固我、扶持我，今天我心中滿有膽量與剛強！',
    tag: '#以賽亞書 #勇敢無懼 #大能扶持 #天父同在'
  },
  {
    id: 'philippians-4-6-7',
    reference: '腓立比書 4:6-7',
    referenceEn: 'Philippians 4:6-7 (ESV)',
    theme: '出人意外的平安 · 保守你的心懷意念',
    category: 'peace',
    chineseText: '應當一無挂慮，只要凡事藉著禱告、祈求，和感謝，將你們所要的告訴神。神所賜、出人意外的平安必在基督耶穌裡保守你們的心懷意念。',
    englishText: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.',
    whisperThought: '將你額頭的皺摺撫平吧，我可愛的孩子。掛慮不能為你增添分毫光陰，但每一次你向我傾吐心事，天國的平安衛隊就駐紮在你的心思意念中。把名單交給我，用感恩換取安息。今晚你可以安然入睡，因為看顧你的從不打盹。',
    whisperThoughtEn: 'Smooth the furrow from your brow, my precious one. Worry cannot add a single hour to your life. When you speak to me with thanksgiving, my transcendent peace stands as a fortress around your heart. Rest peacefully tonight; I never slumber.',
    meditationPrompt: '寫下或默想一件此刻最讓你掛心的事情，輕聲說：「天父，這件事我交託給祢，謝謝祢已經在動工。」',
    prayer: '慈愛的天父，我把心底所有的不安與焦急卸給祢。謝謝祢所賜那超過人所能理解的平安，正溫柔包圍我、撫平我的心跳。阿們。',
    keyDeclaration: '我心中有出人意外的屬天平安，憂慮消散，喜樂與感恩充滿我心！',
    tag: '#腓立比書 #一無掛慮 #超然平安 #禱告感謝'
  },
  {
    id: 'jeremiah-29-11',
    reference: '耶利米書 29:11',
    referenceEn: 'Jeremiah 29:11 (NIV)',
    theme: '賜平安的意念 · 滿有指望的將來',
    category: 'hope',
    chineseText: '耶和華說：我知道我向你們所懷的意念是賜平安的意念，不是降災禍的意念，要叫你們末後有指望。',
    englishText: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
    whisperThought: '孩子，不要因為眼前的迷霧而懷疑我的信實。我看見你生命的起點，更看清你榮耀的終點。我對你的一思一念，全是恩慈與豐盛的藍圖。即使行過幽暗隧道，那也是通往光明的必經之路。相信我，你的明天充滿盼望。',
    whisperThoughtEn: 'Do not doubt my faithfulness in the fog, child. I see your beginning and your glorious destination. My thoughts towards you are brimming with blessing and restoration. Trust my master design; your future is secure in my goodness.',
    meditationPrompt: '回想過去天父如何在看似絕路時為你開道路？數算兩件恩典，讓信心的火苗再次被點燃。',
    prayer: '阿爸天父，謝謝祢對我的一生滿懷平安的計畫！即使前路未明，我也選擇信靠祢無誤的引導。我將我的明天完全交在祢手中。阿們。',
    keyDeclaration: '我的未來在天父美善的命定中，每一步都有平安、每一年都有盼望！',
    tag: '#耶利米書 #美好計畫 #美好未來 #盼望之神'
  },
  {
    id: 'psalm-23-1-3',
    reference: '詩篇 23:1-3',
    referenceEn: 'Psalm 23:1-3 (ESV)',
    theme: '耶和華是我的牧者 · 靈魂得甦醒',
    category: 'stream',
    chineseText: '耶和華是我的牧者，我必不致缺乏。他使我躺臥在青草地上，領我在可安歇的水邊。他使我的靈魂甦醒，為自己的名引導我走義路。',
    englishText: 'The Lord is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters. He restores my soul. He leads me in paths of righteousness for his name\'s sake.',
    whisperThought: '來，卸下你奔馳的腳步。世人催促你奔跑比較，但我輕喚你躺臥在青翠的草場。我是最深愛你的好牧人，你的缺乏我早已知曉，你的疲憊由我撫慰。讓活水洗淨你靈魂的塵埃，跟著我的腳蹤，每一步都是穩妥的坦途。',
    whisperThoughtEn: 'Come lay down your weary steps. The world demands speed, but I invite you into quiet green meadows. I am your tender Shepherd; you lack nothing. Drink from the peaceful brook, let your soul revive, and follow my gentle lead.',
    meditationPrompt: '閉上雙眼，聆聽緩慢的呼吸。想像溪水流淌在腳邊，天父的慈愛如微風吹拂，安息進入心底。',
    prayer: '主耶穌，祢是我一生的好牧者。有祢同在，我不再恐慌缺乏。求祢領我到可安歇的水邊，使我疲乏的心靈重新甦醒，滿得甘甜。阿們。',
    keyDeclaration: '主是我的好牧人，我一無所缺！我躺臥在恩典青草地，靈魂日日甦醒發光！',
    tag: '#詩篇二十三篇 #好牧人 #青草水邊 #靈魂甦醒'
  },
  {
    id: 'matthew-11-28-29',
    reference: '馬太福音 11:28-29',
    referenceEn: 'Matthew 11:28-29 (NIV)',
    theme: '到我這裡來 · 必得享安息',
    category: 'peace',
    chineseText: '凡勞苦擔重擔的人可以到我這裡來，我就使你們得安息。我心裡柔和謙卑，你們當負我的軛，學我的樣式；這樣，你們心裡就必得享安息。',
    englishText: 'Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.',
    whisperThought: '你不需要偽裝堅強，我深知你靈魂的重擔。把那些不屬於你的期待、焦慮與自責放下吧。走到我面前，靠著我的肩膀痛快地呼一口氣。我的心何等柔和，凡在我懷裡的，沒有人會被棄絕，唯有甘甜的安息。',
    whisperThoughtEn: 'You do not have to pretend to be strong before me. Lay down the burdens, expectations, and self-reproach. Come close, rest against my shoulder, and exhale deeply. My heart is gentle; in me, you find true sanctuary.',
    meditationPrompt: '想像將背包裡一顆顆沉重石頭拿出（代表憂慮、責任、自責），一一交在耶穌手上。',
    prayer: '溫柔的主耶穌，我來到祢面前，將我一切勞苦與重擔卸在祢腳前。謝謝祢賜給我心靈深處最真實的安寧。阿們。',
    keyDeclaration: '我已進入基督的安息！祂的軛是容易的，祂的擔子是輕省的，我心輕盈自由！',
    tag: '#馬太福音 #心靈安息 #柔和謙卑 #卸下重擔'
  },
  {
    id: 'romans-8-38-39',
    reference: '羅馬書 8:38-39',
    referenceEn: 'Romans 8:38-39 (ESV)',
    theme: '永遠隔絕不了的愛 · 堅固無比的盟約',
    category: 'love',
    chineseText: '因為我深信：無論是死，是生，是天使，是掌權的，是有能的，是現在的事，是將來的事，是高處的，是低處的，是別的任何受造之物，都不能叫我們與神的愛隔絕；這愛是在我們的主基督耶穌裡的。',
    englishText: 'For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.',
    whisperThought: '沒有任何事物能切斷我對你的愛。不是你的失敗，不是明天的未知，更不是深淵的高低。我用十字架上的寶血為你蓋上愛的永恆印記。即便你對自己感到失望，我的雙臂仍然張開。你永遠是我最珍惜、永不放棄的寶貝。',
    whisperThoughtEn: 'Nothing in this cosmos can sever my love from you. Not past failures, not future terrors, nor any power under heaven. My covenant with you was sealed with royal love. You remain my beloved, forever wrapped in my grace.',
    meditationPrompt: '把手放在心口上，默念三次：「我是天父深愛的孩子，沒有任何事能使這愛隔絕。」',
    prayer: '天父，謝謝祢那永不離棄、寬闊高深的浩大慈愛！當我動搖時，求祢的愛再次緊緊抓牢我，讓我在祢的愛中全然得勝。阿們。',
    keyDeclaration: '神若幫助我，誰能抵擋我？我是蒙大愛的兒女，在耶穌基督的愛中毫無恐懼！',
    tag: '#羅馬書 #永恆之愛 #完全得勝 #不可隔絕'
  },
  {
    id: 'proverbs-3-5-6',
    reference: '箴言 3:5-6',
    referenceEn: 'Proverbs 3:5-6 (NIV)',
    theme: '專心仰賴耶和華 · 祂必指引你的路',
    category: 'guidance',
    chineseText: '你要專心仰賴耶和華，不可倚靠自己的聰明，在你一切所行的事上都要認定他，他必指引你的路。',
    englishText: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.',
    whisperThought: '將方向盤交給我吧，孩子。你有限的智慧只能看清眼前幾步，但我早已為你鋪設平坦的康莊大道。當你願意在每一次決定前低頭尋求我，你會看見絆腳石變成祝福的墊腳石。放心地跟隨，我必帶領你走出曲折迷津。',
    whisperThoughtEn: 'Surrender the steering wheel into my hands, child. Your understanding sees only yards ahead, but I map eternity. When you acknowledge me in every choice, rough stones become stepping stones of blessing. Trust me wholeheartedly.',
    meditationPrompt: '在今天需要做出選擇的一件事上，先停頓三秒，在心裡默禱：「主啊，這件事祢怎麼看？請引導我。」',
    prayer: '主啊，赦免我常憑自己的小聰明盲目奔走。今天我立志全心信賴祢，認定祢是我人生的唯一嚮導，引導我走在正直光明的大道上。阿們。',
    keyDeclaration: '我全心仰賴耶和華，不靠己力！天父掌管我的一言一行，祂必親自修平我的道路！',
    tag: '#箴言 #專心仰賴 #指引前路 #神聖智慧'
  },
  {
    id: 'isaiah-40-31',
    reference: '以賽亞書 40:31',
    referenceEn: 'Isaiah 40:31 (ESV)',
    theme: '如鷹展翅上騰 · 重新得力奔跑不倦',
    category: 'strength',
    chineseText: '但那等候耶和華的必重新得力。他們必如鷹展翅上騰；他們奔跑卻不困倦，行走卻不疲乏。',
    englishText: 'But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.',
    whisperThought: '你感到翅膀沉重、力不能勝嗎？不要在地面徒勞拍翅。來，進入我的同在裡安靜等候。我的聖靈就像上升的溫暖氣流，要將你輕輕托起。你將超越那些困擾你的瑣碎與風浪，在更高遠的天空自由翱翔，奔跑而不困倦！',
    whisperThoughtEn: 'Are your wings weary, child? Cease your frantic flapping. Enter into quiet expectation of my presence. My Spirit is the thermal wind that lifts you into clear azure skies. You shall soar far above worldly friction, renewed with divine energy.',
    meditationPrompt: '深呼吸數次，每一次吸氣默想「吸入神的恩典與力量」，呼氣默想「呼出疲累與挫折感」。',
    prayer: '天父，我在此安靜等候祢。願祢的靈降臨，賜我如雄鷹般超越的眼界與力量。使我今天奔跑不困倦，行走不疲乏！阿們。',
    keyDeclaration: '我等候耶和華，必重新得力！如鷹展翅上騰，超越一切風浪與攔阻！',
    tag: '#以賽亞書 #如鷹上騰 #重新得力 #聖靈大能'
  },
  {
    id: 'john-14-27',
    reference: '約翰福音 14:27',
    referenceEn: 'John 14:27 (NIV)',
    theme: '我留下平安給你們 · 不是世人所能給的',
    category: 'peace',
    chineseText: '我留下平安給你們；我將我的平安賜給你們。我所賜的，不像世人所賜的。你們心裡不要憂愁，也不要膽怯。',
    englishText: 'Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.',
    whisperThought: '世界的平安建立在環境順遂上，但我賜你的平安如同深海之底，任憑海面狂風巨浪，深處依然寧謐清澈。這份平安是我為你親自留下的產業，誰也無法奪去。抬起頭來，你的心可以安穩如磐石。',
    whisperThoughtEn: 'The world\'s peace hinges on outward tranquility, but my peace resides in ocean depths—unshaken by whatever storm churns above. This peace is your inherited treasure. Lift up your countenance; let your heart be fearless.',
    meditationPrompt: '手摸心胸，感受自己真實的呼吸。默想耶穌親手將一顆純淨透明的平安種子放在你心田。',
    prayer: '主耶穌，感謝祢留下如此寶貴的平安。在這個動盪不安的世界中，願祢的平安常駐在我的心思中，驅散所有的憂愁與膽怯。阿們。',
    keyDeclaration: '我有基督親自賜下的純全平安，不隨環境起伏，心靈穩若磐石！',
    tag: '#約翰福音 #真實平安 #無懼憂慮 #主的產業'
  },
  {
    id: 'psalm-46-10',
    reference: '詩篇 46:10',
    referenceEn: 'Psalm 46:10 (ESV)',
    theme: '你們要休息 · 要知道我是神',
    category: 'peace',
    chineseText: '你們要休息，要知道我是神！我必在外邦中被尊崇，在遍地上也被尊崇。',
    englishText: '"Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!"',
    whisperThought: '安靜下來，孩子。放下你急忙要解決一切的手。退一步，看我如何親自掌權。在你的靜默無言中，我的大能正隱密而浩大地運轉。你無須替天行道，只需信任我是神。在安靜沉思中，你將看見奇妙的作為。',
    whisperThoughtEn: 'Be still and cease striving, child. Step back from the battle lines and let me sovereignly reign. In your sacred quietness, my providence weaves its sweetest miracles. Rest in the knowledge that I am your almighty God.',
    meditationPrompt: '撥出60秒，什麼都不想、不滑手機，只是安靜專注在「神正在看顧我」這一件事上。',
    prayer: '神啊，我向祢降服，卸下想要掌控一切的心。求祢使我的靈魂完全安靜，在沉靜中體會祢的偉大與榮美，單單尊崇祢的名。阿們。',
    keyDeclaration: '我要安靜休息，深知主是我的神！祂掌管全地，也掌管我生命中的每一個細節！',
    tag: '#詩篇四十六篇 #安靜休息 #全然掌權 #靜默信靠'
  },
  {
    id: '2-corinthians-12-9',
    reference: '哥林多後書 12:9',
    referenceEn: '2 Corinthians 12:9 (NIV)',
    theme: '我的恩典夠你用的 · 軟弱中顯得完全',
    category: 'grace',
    chineseText: '他對我說：「我的恩典夠你用的，因為我的能力是在人的軟弱上顯得完全。」所以，我更喜歡誇自己的軟弱，好叫基督的能力覆庇我。',
    englishText: 'But he said to me, "My grace is sufficient for you, for my power is made perfect in weakness." Therefore I will boast all the more gladly about my weaknesses, so that Christ\'s power may rest on me.',
    whisperThought: '你不需要對自己的軟弱感到羞愧。正是在你承認力不能勝的那一刻，我的能力才有了最完美的舞台。我的恩典不是一滴滴吝嗇的雨水，而是漫過堤防的汪洋。每一天，每一刻，我的恩典都恰好足夠承載你、托舉你。',
    whisperThoughtEn: 'Do not hide your human frailty with shame, child. In the very place where you run dry, my power flows in triumphant fullness. My grace is not a parsimonious trickle, but an overflowing ocean. It is abundantly enough for you today.',
    meditationPrompt: '面對自己的不足或脆弱，試著不要自責，反而對主說：「主，我在這裡很軟弱，求祢的恩典遮蓋彰顯。」',
    prayer: '親愛的主，謝謝祢的話語釋放了我！我不再為自己的不完美掙扎懊惱，因祢的恩典充充足足，願基督的大能成為我最堅強的護庇。阿們。',
    keyDeclaration: '神的恩典每一天都夠我用！在軟弱之處，基督的大能使我更顯堅固！',
    tag: '#哥林多後書 #夠用恩典 #軟弱變剛強 #基督大能'
  },
  {
    id: 'deuteronomy-31-8',
    reference: '申命記 31:8',
    referenceEn: 'Deuteronomy 31:8 (ESV)',
    theme: '耶和華必在你前面行 · 總不撇下你',
    category: 'guidance',
    chineseText: '耶和華必在你前面行；他必與你同在，決不撇下你，也不丟棄你。不要害怕，也不要驚惶。',
    englishText: 'It is the Lord who goes before you. He will be with you; he will not leave you or forsake you. Do not fear or be dismayed.',
    whisperThought: '邁開腳步吧，我的孩子。你不是孤軍奮戰的斥候，我早已走在你的前頭。那些荊棘與險峻，我都已為你先行勘測、挪開阻礙。無論你走到哪裡，天涯海角，我的同在從不中斷。昂首向前，我們一同前行。',
    whisperThoughtEn: 'Step boldly forward, child. You are not treading unknown trails alone; I have already walked ahead of you. I clear the thorns and scout the peaks. My presence is an unbreakable covenant. March on with courage; we walk together.',
    meditationPrompt: '想像前方是一條鋪滿金黃晨曦的小徑，耶穌正走在最前面回頭向你微笑招手。',
    prayer: '天父，感謝祢總是走在我前頭開路！每當前途茫茫時，求祢提醒我：祢從未撇下我，祢的同在是我最大的倚靠與保護。阿們。',
    keyDeclaration: '耶和華走在我前面，開闢奇妙道路！祂與我同行，我永不孤單、毫不退縮！',
    tag: '#申命記 #前頭引導 #永不撇下 #勇往直前'
  },
  {
    id: 'zephaniah-3-17',
    reference: '西番雅書 3:17',
    referenceEn: 'Zephaniah 3:17 (NIV)',
    theme: '祂必因你歡欣喜樂 · 在愛中得享安息',
    category: 'love',
    chineseText: '耶和華你的神是施行拯救、大有能力的主。他在你中間必因你歡欣喜樂，默然愛你，且因你喜樂而歡呼。',
    englishText: 'The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
    whisperThought: '可曾聽見我的歌聲？我不僅是大能的拯救者，更是為你歡欣雀躍的父親。當你看著鏡子也許看見瑕疵，但我定睛於你時，眼中滿溢的是純粹的喜悅與自豪。我在愛中安靜守護你，天上全軍也為你歡呼歌唱。',
    whisperThoughtEn: 'Can you hear the melodious song of heaven over you? I am not merely the triumphant warrior; I am your Father who sings over your life with delight. Rest deeply in my quiet, unblemished affection. You bring immense joy to my heart.',
    meditationPrompt: '感受天父用深情與自豪的眼神注視著你。對自己說：「我是天父的喜樂，祂深愛著我。」',
    prayer: '阿爸天父，我的心何等震撼於祢對我的喜愛！謝謝祢用無條件的愛圍繞我，甚至因我歡呼歌唱。願我的生命也成為讓祢心意滿足的甘甜之祭。阿們。',
    keyDeclaration: '神因我歡欣喜樂，以愛默然環繞我！我是蒙神深深喜愛與呵護的珍寶！',
    tag: '#西番雅書 #歡欣歌唱 #默然真愛 #天父喜樂'
  },
  {
    id: 'psalm-91-1-2',
    reference: '詩篇 91:1-2',
    referenceEn: 'Psalm 91:1-2 (ESV)',
    theme: '住在至高者隱密處 · 全能者的蔭下',
    category: 'stream',
    chineseText: '住在至高者隱密處的，必住在全能者的蔭下。我要論到耶和華說：他是我的避難所，是我的山寨，是我的神，是我所倚靠的。',
    englishText: 'He who dwells in the shelter of the Most High will abide in the shadow of the Almighty. I will say to the Lord, "My refuge and my fortress, my God, in whom I trust."',
    whisperThought: '走進我遮蔽的翅膀下吧。世間的烈日、冷雨與流言蜚語，都無法穿透至高者的隱密之所。在這裡，有永不枯竭的泉源與至聖的安寧。把這裡當成你的家，每一天住在我的蔭庇中，沒有任何黑暗能傷害你。',
    whisperThoughtEn: 'Come beneath the canopy of my sheltering wings. Neither the scorch of hardship nor the storms of adversity can penetrate my secret sanctuary. Dwell here in living communion; in my shadow, you find absolute peace and safety.',
    meditationPrompt: '想像自己像小雛鷹鑽進母鷹巨大溫暖的羽翼下，外面的狂風驟雨都與你無關，只有溫暖與安全。',
    prayer: '至高全能的神，祢是我永遠的避難所和堅固營壘。今天我選擇藏身在祢的翅膀蔭下，依靠祢的大能，安享屬天的安穩。阿們。',
    keyDeclaration: '我住在至高者隱密處，住在全能者的蔭下！主是我的山寨與避難所，我堅定信賴祂！',
    tag: '#詩篇九十一篇 #全能者蔭下 #堅固避難所 #隱密之處'
  }
];
