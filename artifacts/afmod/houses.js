// AFMOD — Houses dataset (pure JavaScript)
// Exposed on the global window object so app.js can use it without ES modules.
window.HOUSES = [
  {
    id: "single-trailer",
    nameAr: "مقطورة فردية",
    nameEn: "Single Trailer",
    tier: "اقتصادي",
    price: 12000,
    units: 13,
    locationsAr: "حي المقطورات • سبرينغفيلد • شمال متجر الأسلحة",
    bedroomsAr: "غرفة نوم رئيسية واحدة",
    bathroomsAr: "حمّام واحد",
    amenitiesAr: ["غرفة معيشة", "مطبخ", "غرفة غسيل", "خزانة واحدة", "مدخل أمامي ومدخل خلفي"],
    notesAr: "الخيار الأرخص ضمن المعروض. مناسب للمواطن الفرد أو إقامة قصيرة.",
    cover: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/8/8f/Single_Trailer.png/revision/latest?cb=20240319005430",
    gallery: [
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/6/60/Single_Trailer_living_room.png/revision/latest?cb=20240319005722", captionAr: "غرفة المعيشة" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/0/06/Single_Trailer_kitchen.png/revision/latest?cb=20240319005730", captionAr: "المطبخ" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/a/ac/Single_Trailer_bathroom.png/revision/latest?cb=20240319005750", captionAr: "الحمّام" }
    ]
  },
  {
    id: "log-cabin",
    nameAr: "كوخ خشبي",
    nameEn: "Log Cabin",
    tier: "اقتصادي",
    price: 13000,
    units: 8,
    locationsAr: "منتزه هاي روك حصراً",
    bedroomsAr: "غرفتا نوم (إحداهما رئيسية)",
    bathroomsAr: "حمّام واحد",
    amenitiesAr: ["غرفة معيشة", "مطبخ", "ركن طعام", "شُرفة أمامية مرتفعة", "موقف سيارات خارجي"],
    notesAr: "الكوخ الخشبي الوحيد بدون مدخل خلفي. إطلالة طبيعية على المنتزه.",
    cover: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/6/66/Log_Cabin.png/revision/latest?cb=20240319010901",
    gallery: [
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/a/a1/Log_Cabin_living_area.png/revision/latest?cb=20240319011255", captionAr: "غرفة المعيشة والمطبخ والطعام" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/c6/Log_Cabin_master_bedroom.png/revision/latest?cb=20240319011306", captionAr: "غرفة النوم الرئيسية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/0/05/Log_Cabin_bedroom_1.png/revision/latest?cb=20240319011317", captionAr: "غرفة النوم الثانية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/d/dd/Log_Cabin_bathroom.png/revision/latest?cb=20240319011327", captionAr: "الحمّام" }
    ]
  },
  {
    id: "double-trailer",
    nameAr: "مقطورة مزدوجة",
    nameEn: "Double Trailer",
    tier: "اقتصادي",
    price: 14000,
    units: 7,
    locationsAr: "حي المقطورات • سبرينغفيلد • شمال متجر الأسلحة",
    bedroomsAr: "غرفتا نوم (إحداهما رئيسية)",
    bathroomsAr: "حمّام واحد",
    amenitiesAr: ["غرفة معيشة", "مطبخ وركن طعام", "غرفة غسيل", "خزانتان", "مدخل أمامي ومدخل خلفي"],
    cover: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/6/64/Double_Trailer.png/revision/latest?cb=20240319010019",
    gallery: [
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/c8/Double_Trailer_living_room.png/revision/latest?cb=20240319010628", captionAr: "غرفة المعيشة" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/3/38/Double_Trailer_kitchen_and_dining_area.png/revision/latest?cb=20240319010638", captionAr: "المطبخ وركن الطعام" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/0/02/Double_Trailer_master_bedroom.png/revision/latest?cb=20240319010659", captionAr: "غرفة النوم الرئيسية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/cb/Double_Trailer_bedroom_1.png/revision/latest?cb=20240319010711", captionAr: "غرفة النوم الثانية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/cc/Double_Trailer_bathroom.png/revision/latest?cb=20240319010723", captionAr: "الحمّام" }
    ]
  },
  {
    id: "small-house",
    nameAr: "منزل صغير",
    nameEn: "Small House",
    tier: "متوسط",
    price: 14800,
    units: 9,
    locationsAr: "حي السكن (Housing Suburb) حصراً",
    bedroomsAr: "ثلاث غرف نوم (إحداها رئيسية)",
    bathroomsAr: "حمّام واحد",
    amenitiesAr: ["غرفة معيشة", "مطبخ وركن طعام", "غرفة غسيل", "أربع خزانات", "ممر سيارة جانبي", "فناء أمامي صغير", "مدخل خلفي بباب مزدوج"],
    notesAr: "الخيار الأنسب للعائلات. لا يتطلب صلاحية خاصة.",
    cover: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/ca/Small_House.png/revision/latest?cb=20240319002926",
    gallery: [
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/b/b9/Small_House_living_room.png/revision/latest?cb=20240319002935", captionAr: "غرفة المعيشة" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/ca/Small_House_kitchen_and_dining_area.png/revision/latest?cb=20240319002947", captionAr: "المطبخ وركن الطعام" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/1/1c/Small_House_master_bedroom.png/revision/latest?cb=20240319002959", captionAr: "غرفة النوم الرئيسية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/6/63/Small_House_bedroom_1.png/revision/latest?cb=20240319003010", captionAr: "غرفة النوم الأولى" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/a/ab/Small_House_bedroom_2.png/revision/latest?cb=20240319003019", captionAr: "غرفة النوم الثانية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/1/16/Small_House_bathroom.png/revision/latest?cb=20240319003030", captionAr: "الحمّام" }
    ]
  },
  {
    id: "medium-house",
    nameAr: "منزل متوسط",
    nameEn: "Medium House",
    tier: "فاخر",
    price: 19000,
    units: 18,
    locationsAr: "حي السكن • سبرينغفيلد • غرب سبرينغفيلد",
    bedroomsAr: "غرفتا نوم (إحداهما رئيسية)",
    bathroomsAr: "حمّامان (أحدهما رئيسي)",
    amenitiesAr: ["غرفة معيشة", "مطبخ وركن طعام", "غرفة مكتب", "غرفة غسيل", "كراج", "ثلاث خزانات", "ممر للكراج", "مدخل خلفي بباب مزدوج"],
    notesAr: "غرفة مكتب ومرآب خاص. مثالي لاستقبال العمل من المنزل.",
    cover: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/2/24/Medium_House.png/revision/latest?cb=20240319003655",
    gallery: [
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/b/bb/Medium_House_living_room.png/revision/latest?cb=20240319003948", captionAr: "غرفة المعيشة" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/8/81/Medium_House_kitchen_and_dining_area.png/revision/latest?cb=20240319004000", captionAr: "المطبخ وركن الطعام" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/b/bf/Medium_House_office_room.png/revision/latest?cb=20240319004011", captionAr: "غرفة المكتب" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/a/af/Medium_House_garage.png/revision/latest?cb=20240319004046", captionAr: "الكراج" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/cf/Medium_House_master_bedroom.png/revision/latest?cb=20240319004058", captionAr: "غرفة النوم الرئيسية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/5/5b/Medium_House_master_bathroom.png/revision/latest?cb=20240319004108", captionAr: "الحمّام الرئيسي" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/b/b2/Medium_House_bedroom_1.png/revision/latest?cb=20240319004120", captionAr: "غرفة النوم الثانية" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/6/65/Medium_House_bathroom_1.png/revision/latest?cb=20240319004131", captionAr: "الحمّام الثاني" }
    ]
  },
  {
    id: "large-house",
    nameAr: "منزل كبير",
    nameEn: "Large House",
    tier: "حصري",
    price: 26000,
    units: 15,
    locationsAr: "حي السكن • سبرينغفيلد • غرب سبرينغفيلد",
    bedroomsAr: "ثلاث غرف نوم (غرفتان رئيسيتان في الطابق العلوي)",
    bathroomsAr: "حمّامان في الطابق العلوي",
    amenitiesAr: ["طابقان", "غرفة معيشة", "مطبخ منفصل", "ركن طعام", "غرفة مكتب", "كراج", "غرفة غسيل", "خزانات متعددة", "فناء خلفي وأمامي"],
    notesAr: "الفئة الحصرية بطابقين. تتطلب تصريحاً خاصاً (Premium Housing). تتيح أيضاً تخصيص ألوان الواجهة الخارجية.",
    cover: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/4/47/Large_House.png/revision/latest?cb=20240319004505",
    gallery: [
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/f/fa/Large_House_living_room.png/revision/latest?cb=20240319004843", captionAr: "غرفة المعيشة" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/0/06/Large_House_kitchen.png/revision/latest?cb=20240319004852", captionAr: "المطبخ" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/c/c4/Large_House_dining_area.png/revision/latest?cb=20240319004900", captionAr: "ركن الطعام" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/8/83/Large_House_office_room.png/revision/latest?cb=20240319004913", captionAr: "غرفة المكتب" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/1/17/Large_House_garage.png/revision/latest?cb=20240319004938", captionAr: "الكراج" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/0/05/Large_House_first_floor_bedroom.png/revision/latest?cb=20240319004927", captionAr: "غرفة نوم الطابق الأول" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/6/6a/Large_House_second_floor_bedroom_1.png/revision/latest?cb=20240319005027", captionAr: "غرفة النوم الرئيسية الأولى — الطابق العلوي" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/0/05/Large_House_second_floor_bathroom_1.png/revision/latest?cb=20240319005042", captionAr: "حمّام الطابق العلوي ١" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/4/40/Large_House_second_floor_bedroom_2.png/revision/latest?cb=20240319005056", captionAr: "غرفة النوم الرئيسية الثانية — الطابق العلوي" },
      { url: "https://static.wikia.nocookie.net/emergency-response-liberty-county/images/7/7f/Large_House_second_floor_bathroom_2.png/revision/latest?cb=20240319005108", captionAr: "حمّام الطابق العلوي ٢" }
    ]
  }
];

window.formatPrice = function (price) {
  return "$" + price.toLocaleString("en-US");
};
