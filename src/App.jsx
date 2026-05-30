import { useState, useMemo, useEffect, useCallback, useRef } from "react";

const BRAND = {
  yellow:"#F5C842", yellowDim:"#F5C84215", yellowBorder:"#F5C84235",
  bg:"#111729", card:"#18243D", cardBorder:"#1E2A45",
  text:"#E8EDF8", textMuted:"#5A6A8A", textSub:"#8A97B5",
  green:"#2DD4A4", red:"#E8547A", purple:"#7C6AF7",
};

const LOGO_SRC = "data:image/png;base64,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";

const RAW = [{"poi_id":"21568226360372574","name":"Portola Grand Renggali Hotel Takengon","l1":"Aceh","l2":"Central Aceh","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226270584319","name":"Casanemo Beach Resort & Spa","l1":"Aceh","l2":"Sabang","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865206594329","name":"The Pade Hotel","l1":"Aceh","l2":"Aceh Besar","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226252766542","name":"Hermes Palace Hotel Banda Aceh","l1":"Aceh","l2":"Banda Aceh","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226360735735","name":"AnandaDara Ubud Resort & Spa","l1":"Bali","l2":"Gianyar","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226304920154","name":"Platinum Hotels JIMBARAN BEACH BALI","l1":"Bali","l2":"Badung","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226304904533","name":"The Meru Sanur","l1":"Bali","l2":"Denpasar","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226308743543","name":"Kubu Bali Suite Seminyak","l1":"Bali","l2":"Badung","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226360468203","name":"GRAND SAFRAN HOTEL PANGKALPINANG","l1":"Bangka Belitung Islands","l2":"Pangkalpinang","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535796482791014","name":"Hotel Santika Premiere Beach Resort Belitung","l1":"Bangka Belitung Islands","l2":"Belitung","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865203030699","name":"Soll Marina Hotel BANGKA","l1":"Bangka Belitung Islands","l2":"Central Bangka","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865205918455","name":"Swiss-Belhotel Pangkal Pinang","l1":"Bangka Belitung Islands","l2":"Pangkalpinang","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226360640766","name":"DoubleTree by Hilton Jakarta Bintaro Jaya","l1":"Banten","l2":"South Tangerang","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226301061511","name":"HOTEL TENTREM JAKARTA","l1":"Banten","l2":"South Tangerang","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226381559369","name":"ARYADUTA Lippo Village & ARYADUTA Country Club","l1":"Banten","l2":"Tangerang","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"21568226299885986","name":"Tentrem Room at Springwood Residence","l1":"Banten","l2":"Tangerang City","star":5.0,"price_tier":"Low [0,30]","aov_idr":540000,"tags":["Weekend Getaway"],"photo":"","promo":""},{"poi_id":"21568226259228878","name":"Hotel Mercure Bengkulu","l1":"Bengkulu","l2":"Bengkulu","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226305260996","name":"Two K Azana Style Hotel Bengkulu","l1":"Bengkulu","l2":"Bengkulu","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"22535796481339645","name":"Hotel Santika Bengkulu","l1":"Bengkulu","l2":"Bengkulu","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"34955879828936067","name":"Padma Hotel Semarang","l1":"Central Java","l2":"Semarang City","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226300217910","name":"villa ira glamping","l1":"Central Java","l2":"Banjarnegara","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226291682658","name":"Grand Mercure Solo Baru","l1":"Central Java","l2":"Sukoharjo","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"20442395131084718","name":"Aquarius Boutique Hotel Palangkaraya","l1":"Central Kalimantan","l2":"Palangkaraya","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"21462673133640039","name":"Swiss-Belhotel Danum Palangka Raya","l1":"Central Kalimantan","l2":"Palangkaraya","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"42203860654576607","name":"Alltrue Hotel Palangkaraya","l1":"Central Kalimantan","l2":"Palangkaraya","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226272585253","name":"Mercure Pangkalan Bun","l1":"Central Kalimantan","l2":"West Kotawaringin","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226303554272","name":"Grand Sya Hotel Palu","l1":"Central Sulawesi","l2":"Palu","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226300961955","name":"Aston Palu Hotel & Conference Centre","l1":"Central Sulawesi","l2":"Palu","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"34955879828783704","name":"Swiss-Belinn Luwuk","l1":"Central Sulawesi","l2":"Banggai","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865205492728","name":"Estrella Hotel & Conference Luwuk","l1":"Central Sulawesi","l2":"Banggai","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226308534098","name":"Grand Swiss-Belhotel Darmo Surabaya","l1":"East Java","l2":"Surabaya","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"34955879830747051","name":"VASA HOTEL SURABAYA","l1":"East Java","l2":"Surabaya","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226299823466","name":"Bobocabin Pacet, Mojokerto","l1":"East Java","l2":"Mojokerto","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"42203860550703890","name":"Swissôtel Nusantara","l1":"East Kalimantan","l2":"North Penajam Paser","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226290546540","name":"The Malibu SUITES Balikpapan","l1":"East Kalimantan","l2":"Balikpapan","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535796481569627","name":"GRAN SENYIUR","l1":"East Kalimantan","l2":"Balikpapan","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"42203860645870496","name":"Borneo Bay City Apartment 1Room","l1":"East Kalimantan","l2":"Balikpapan","star":4.5,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"42203860550492127","name":"Katamaran Hotel & Resort Komodo","l1":"East Nusa Tenggara","l2":"West Manggarai","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865203354506","name":"The Jayakarta Suites Komodo Flores","l1":"East Nusa Tenggara","l2":"West Manggarai","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Romantic Stays","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865206523722","name":"Meruorah Komodo Labuan Bajo","l1":"East Nusa Tenggara","l2":"West Manggarai","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535796482337960","name":"HOTEL Ayana Komodo Waecicu Beach","l1":"East Nusa Tenggara","l2":"West Manggarai","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"34973472017496354","name":"Grand Q Hotel Gorontalo","l1":"Gorontalo","l2":"Gorontalo City","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226272452847","name":"Aston Gorontalo Hotel & Convention Center","l1":"Gorontalo","l2":"Gorontalo City","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"21568226360272117","name":"Fox Hotels Gorontalo","l1":"Gorontalo","l2":"Gorontalo City","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226304791902","name":"PARKROYAL Serviced Suites Jakarta","l1":"Jakarta","l2":"Central Jakarta","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226360274007","name":"Pan Pacific Jakarta","l1":"Jakarta","l2":"Central Jakarta","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226299488977","name":"Vertu Harmoni Jakarta","l1":"Jakarta","l2":"Central Jakarta","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"42203860645935087","name":"Keraton at The Plaza - The Unbound Collection by Hyatt","l1":"Jakarta","l2":"Central Jakarta","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535796481347303","name":"Aston Jambi Hotel & Conference Center","l1":"Jambi","l2":"Jambi","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865205132587","name":"Swiss-Belhotel Jambi","l1":"Jambi","l2":"Jambi","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"21568226381658141","name":"BW Luxury Hotel Jambi","l1":"Jambi","l2":"Jambi","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"22535865631803676","name":"Yello Hotel Jambi","l1":"Jambi","l2":"Jambi","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226301847100","name":"Grand Mercure Lampung","l1":"Lampung","l2":"Bandar Lampung","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226360373577","name":"Lampung Marriott Resort & Spa","l1":"Lampung","l2":"Pesawaran","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535796481626929","name":"Radisson Lampung Kedaton","l1":"Lampung","l2":"Bandar Lampung","star":4.5,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"22535865203038572","name":"AKAR Hotels Lampung","l1":"Lampung","l2":"Bandar Lampung","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865205419262","name":"Hotel Santika Premiere Ambon","l1":"Maluku","l2":"Ambon","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226256967129","name":"The Natsepa Hotel & Resort","l1":"Maluku","l2":"Central Maluku","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226272082857","name":"RumaRuma Farvet Residence @ Ambon","l1":"Maluku","l2":"Ambon","star":3.0,"price_tier":"Low [0,30]","aov_idr":540000,"tags":["Weekend Getaway"],"photo":"","promo":""},{"poi_id":"22535865209197218","name":"Golden Palace Hotel Ambon","l1":"Maluku","l2":"Ambon","star":0.0,"price_tier":"Low [0,30]","aov_idr":540000,"tags":["Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865204018205","name":"Swiss-Belhotel Tarakan","l1":"North Kalimantan","l2":"Tarakan","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"21568226381756032","name":"Luminor Hotel Tanjung Selor","l1":"North Kalimantan","l2":"Bulungan","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535796481331563","name":"BELA INTER NATIONAL HOTEL","l1":"North Maluku","l2":"Ternate","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Romantic Stays","Family Friendly"],"photo":"","promo":""},{"poi_id":"21568226381559980","name":"Muara Hotel and Mall Ternate","l1":"North Maluku","l2":"Ternate","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226268830935","name":"Roger's Hotel Manado","l1":"North Sulawesi","l2":"Manado","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535865203008326","name":"Sintesa Peninsula Hotel Manado","l1":"North Sulawesi","l2":"Manado","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535796481369615","name":"Hotel Gran Puri Manado","l1":"North Sulawesi","l2":"Manado","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535865203008304","name":"Swiss-Belhotel Maleosan Manado","l1":"North Sulawesi","l2":"Manado","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"21568226300023248","name":"Purnama Balige Hotel","l1":"North Sumatra","l2":"Toba Samosir","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535865203905787","name":"Grand Mercure Maha Cipta Medan Angkasa","l1":"North Sumatra","l2":"Medan","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865203039833","name":"Cambridge Hotel Medan","l1":"North Sumatra","l2":"Medan","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865204574305","name":"Hotel Danau Toba International","l1":"North Sumatra","l2":"Medan","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535865203025023","name":"Hotel Horison Ultima Timika","l1":"Papua","l2":"Mimika","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21462673133565800","name":"Swiss-Belhotel MERAUKE","l1":"Papua","l2":"Merauke","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"34973472017224749","name":"Suni Garden Lake Hotel And Resort","l1":"Papua","l2":"Jayapura","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Romantic Stays"],"photo":"","promo":""},{"poi_id":"21568295409883323","name":"FOX Hotel Jayapura","l1":"Papua","l2":"Jayapura City","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865210312800","name":"Grand Jatra Hotel Pekanbaru","l1":"Riau","l2":"Pekanbaru","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865206153197","name":"Grand Central Hotel Pekanbaru","l1":"Riau","l2":"Pekanbaru","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865208575106","name":"Hotel Novotel Pekanbaru","l1":"Riau","l2":"Pekanbaru","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"20442395130566371","name":"Grand Zuri Hotel Pekanbaru","l1":"Riau","l2":"Pekanbaru","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"21568226272539113","name":"One Of A Kind Resort @ Trikora Beach - Bintan","l1":"Riau Islands","l2":"Bintan","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226294042356","name":"Palam Mansion at Apartment One Residence","l1":"Riau Islands","l2":"Batam","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865207169648","name":"MONTIGO RESORTS NONGSA","l1":"Riau Islands","l2":"Batam","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"33988311950143030","name":"Lovina 5-AA at One Residence","l1":"Riau Islands","l2":"Batam","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535865209144421","name":"PYRAMID SUITES HOTEL","l1":"South Kalimantan","l2":"Banjarmasin","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535865203008006","name":"Swiss-Belhotel BORNEO BANJARMASIN","l1":"South Kalimantan","l2":"Banjarmasin","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865204218626","name":"Best World Kindai Hotel","l1":"South Kalimantan","l2":"Banjarmasin","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"22535865203333937","name":"GALAXY HOTEL","l1":"South Kalimantan","l2":"Banjarmasin","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865203031351","name":"Aryaduta Makassar","l1":"South Sulawesi","l2":"Makassar","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865204617916","name":"Melia Hotel Makassar","l1":"South Sulawesi","l2":"Makassar","star":4.5,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226381755219","name":"The Rinra Hotel Makassar","l1":"South Sulawesi","l2":"Makassar","star":4.5,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226254916490","name":"Hotel MaxOne Makassar","l1":"South Sulawesi","l2":"Makassar","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865205113486","name":"Wyndham Opi Hotel Palembang","l1":"South Sumatra","l2":"Banyuasin","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865205505513","name":"The Excelton Hotel Palembang","l1":"South Sumatra","l2":"Palembang","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays","Weekend Getaway"],"photo":"","promo":""},{"poi_id":"22535796481555503","name":"The Arista Hotel Palembang","l1":"South Sumatra","l2":"Palembang","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865206535766","name":"Hotel Santika Premiere Bandara - Palembang","l1":"South Sumatra","l2":"Palembang","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535796489692848","name":"Claro Kendari","l1":"Southeast Sulawesi","l2":"Kendari","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"20442395130695762","name":"Swiss-Belhotel Kendari","l1":"Southeast Sulawesi","l2":"Kendari","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"21568226302306449","name":"Sahid Azizah Syariah Hotel & Convention Kendari","l1":"Southeast Sulawesi","l2":"Kendari","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226305540188","name":"kinaralana Boutique Hotel","l1":"Special Region of Yogyakarta","l2":"Sleman","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"42203860548281385","name":"Hotel Wijaya family 2","l1":"Special Region of Yogyakarta","l2":"Sleman","star":5.0,"price_tier":"Low [0,30]","aov_idr":540000,"tags":["Family Friendly"],"photo":"","promo":""},{"poi_id":"21568226297179006","name":"Wyndham GARDEN YOGYAKARTA","l1":"Special Region of Yogyakarta","l2":"Sleman","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226364620111","name":"The Papandayan Hotel","l1":"West Java","l2":"Bandung City","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"34955879830526460","name":"Le Eminence Hotel Convention & Resort","l1":"West Java","l2":"Cianjur","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226300135128","name":"Grand TRAVELLO Hotel","l1":"West Java","l2":"Bekasi City","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226381560124","name":"Royal Tulip Gunung Geulis Resort and Golf","l1":"West Java","l2":"Bogor","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865205997250","name":"Golden Tulip Pontianak","l1":"West Kalimantan","l2":"Pontianak","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865206139504","name":"HARRIS Hotel Pontianak","l1":"West Kalimantan","l2":"Pontianak","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Family Friendly"],"photo":"","promo":""},{"poi_id":"22535865209166064","name":"Hotel Horison Ultima Singkawang","l1":"West Kalimantan","l2":"Singkawang","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865204102192","name":"Kahyangan Resort Bengkayang","l1":"West Kalimantan","l2":"Bengkayang","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations","Romantic Stays","Family Friendly"],"photo":"","promo":""},{"poi_id":"21568226268262654","name":"Royal Avila Boutique Resort","l1":"West Nusa Tenggara","l2":"North Lombok","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226296767516","name":"Merumatta Senggigi Lombok","l1":"West Nusa Tenggara","l2":"West Lombok","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226381752935","name":"Cocana Resort Gili Trawangan","l1":"West Nusa Tenggara","l2":"North Lombok","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226293133619","name":"Katamaran Hotel & Resort Lombok","l1":"West Nusa Tenggara","l2":"West Lombok","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Romantic Stays","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568226273898612","name":"AIMAS HOTEL","l1":"West Papua","l2":"Sorong","star":4.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226381559966","name":"VEGA PRIME HOTEL","l1":"West Papua","l2":"Sorong City","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865206801457","name":"HOTEL MARIAT SORONG","l1":"West Papua","l2":"Sorong","star":3.0,"price_tier":"Low [0,30]","aov_idr":540000,"tags":["Family Friendly"],"photo":"","promo":""},{"poi_id":"42203860726273799","name":"Matos Hotel Mamuju","l1":"West Sulawesi","l2":"Mamuju","star":3.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"42203860654576678","name":"Atiyan Hotel Syariah","l1":"West Sumatra","l2":"Bukittinggi","star":5.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"22535865203911877","name":"Premier Basko Hotel Padang","l1":"West Sumatra","l2":"Padang","star":5.0,"price_tier":"Mid [30,50]","aov_idr":720000,"tags":["Best Weekend Staycations"],"photo":"","promo":""},{"poi_id":"21568226254004470","name":"Hotel Mercure Padang","l1":"West Sumatra","l2":"Padang","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Luxurious Stays"],"photo":"","promo":""},{"poi_id":"21568295415841774","name":"The ZHM Premiere Hotel Padang","l1":"West Sumatra","l2":"Padang","star":4.0,"price_tier":"High [>50]","aov_idr":1170000,"tags":["Family Friendly","Luxurious Stays"],"photo":"","promo":""}];

const PROMOS = ["Diskon hingga 40% untuk pemesanan akhir pekan","Dapatkan sarapan gratis untuk 2 orang","Menginap 2 malam gratis 1 malam","Cashback Rp200.000 via TikTok GO","Late check-out gratis hingga pukul 14.00","Free upgrade kamar untuk kreator terpilih","Paket makan malam romantis + kamar premium","Diskon 30% + welcome drink gratis","Voucher spa senilai Rp150.000 per malam","Cashback 25% untuk first-time booker"];
const FALLBACK_PHOTOS = ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=260&fit=crop","https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=260&fit=crop"];
const FALLBACK_THUMBS = FALLBACK_PHOTOS.map(u=>u.replace("w=400&h=260","w=80&h=80"));

const hx = id => { let h=0; for(let i=0;i<id.length;i++) h=(h*31+id.charCodeAt(i))>>>0; return h; };
const fallbackPhoto = id => FALLBACK_PHOTOS[hx(id)%FALLBACK_PHOTOS.length];
const fallbackThumb = id => FALLBACK_THUMBS[hx(id)%FALLBACK_THUMBS.length];
const autoPromo = id => PROMOS[hx(id)%PROMOS.length];

const TIER_SCORE = {"Low [0,30]":1,"Mid [30,50]":2,"High [>50]":3};
const TIER_LABEL = {"Low [0,30]":"Budget","Mid [30,50]":"Menengah","High [>50]":"Premium"};
const TIER_COLOR = {"Low [0,30]":BRAND.green,"Mid [30,50]":BRAND.yellow,"High [>50]":BRAND.purple};
const TAG_ICON   = {"Best Weekend Staycations":"🏖️","Romantic Stays":"💑","Family Friendly":"👨\u200d👩\u200d👧","SBG Top Picks":"⭐","Luxurious Stays":"💎","Weekend Getaway":"🌿"};
const ALL_TAGS   = Object.keys(TAG_ICON);

function calcScore(h) {
  return Math.round(((h.star||0)/5)*40 + ((TIER_SCORE[h.price_tier]||1)/3)*30 + (Math.min((h.tags||[]).length/6,1))*20 + (Math.min((h.aov_idr||0)/1170000,1))*10);
}

function enrichHotel(h) {
  return {
    ...h,
    score: calcScore(h),
    photo: h.photo || fallbackPhoto(h.poi_id),
    thumb: (h.photo ? h.photo.replace("w=400&h=260","w=80&h=80") : null) || fallbackThumb(h.poi_id),
    promo: h.promo || autoPromo(h.poi_id),
    published: h.published !== false,
  };
}

// ── CSV Parser ─────────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim().replace(/^"|"$/g,""));
  const results = [];
  for(let i=1;i<lines.length;i++) {
    if(!lines[i].trim()) continue;
    // Handle quoted commas
    const cols = [];
    let cur = "", inQ = false;
    for(const ch of lines[i]) {
      if(ch==='"') inQ=!inQ;
      else if(ch===","&&!inQ) { cols.push(cur.trim()); cur=""; }
      else cur+=ch;
    }
    cols.push(cur.trim());
    const row = {};
    headers.forEach((h,j) => { row[h] = (cols[j]||"").replace(/^"|"$/g,"").trim(); });
    results.push(row);
  }
  return results;
}

function csvRowToHotel(row) {
  const tagKeys = ["best_weekend","romantic_stays","family_friendly","sbg_top_picks","luxurious_stays","weekend_getaway"];
  const tagNames = ["Best Weekend Staycations","Romantic Stays","Family Friendly","SBG Top Picks","Luxurious Stays","Weekend Getaway"];
  const tags = tagKeys.map((k,i) => row[k]==="Yes" ? tagNames[i] : null).filter(Boolean);
  const aov_usd = parseFloat(row.aov_usd)||30;
  return {
    poi_id: row.poi_id || "csv_"+Date.now()+"_"+Math.random().toString(36).slice(2),
    name: row.poi_name || row.name || "",
    l1: row.l1_region || row.l1 || "",
    l2: row.l2_region || row.l2 || "",
    city_display: row.city_display || row.l2_region || row.l2 || "",
    star: parseFloat(row.star_rating || row.star) || 0,
    price_tier: row.price_tier || row.price_tiering || "Mid [30,50]",
    aov_idr: Math.round(aov_usd * 18000),
    tags,
    photo: row.photo_url || row.photo || "",
    promo: row.promo_text || row.promo || "",
    wa_link: row.wa_link || row.whatsapp_link || "",
    published: (row.published||"Yes") !== "No",
  };
}

// ── Storage ────────────────────────────────────────────────────────────────────
const LS_SAVED   = "adtree_saved_v2";
const LS_HOTELS  = "adtree_hotels_v2";
const getSaved   = () => { try{ return JSON.parse(localStorage.getItem(LS_SAVED)||"[]"); }catch{ return []; } };
const setSavedLS = ids => localStorage.setItem(LS_SAVED, JSON.stringify(ids));
const getHotelsLS= () => { try{ const d=localStorage.getItem(LS_HOTELS); return d?JSON.parse(d):null; }catch{ return null; } };
const setHotelsLS= h => localStorage.setItem(LS_HOTELS, JSON.stringify(h));

const ADMIN_USER = "adtree@admin";
const ADMIN_PASS = "0ADTREE1234!";

const ALL_L1 = ["Semua Provinsi",...Array.from(new Set(RAW.map(h=>h.l1))).sort()];
const fmtIdr = n => n>=1000000?"Rp"+(n/1000000).toFixed(1).replace(".0","")+" Jt":n>=1000?"Rp"+(n/1000).toFixed(0)+" Rb":"Rp"+n;

function Stars({count}) {
  if(!count) return <span style={{color:BRAND.textMuted,fontSize:10}}>N/A</span>;
  return <span style={{color:BRAND.yellow,fontSize:12,letterSpacing:1}}>{"★".repeat(Math.floor(count))}{count%1>=0.5?"½":""}</span>;
}
function ScoreBadge({val}) {
  const col = val>=80?BRAND.green:val>=55?BRAND.yellow:BRAND.textMuted;
  return <div style={{fontSize:10,fontWeight:800,color:col,background:col+"22",borderRadius:20,padding:"2px 8px",border:`1px solid ${col}44`}}>{val}pt</div>;
}
const CATS = [{id:"accommodations",label:"Akomodasi",icon:"🏨",live:true},{id:"dining",label:"Kuliner",icon:"🍜",live:false},{id:"todo",label:"Wisata",icon:"🎡",live:false}];

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const initHotels = () => {
    const cached = getHotelsLS();
    if(cached && cached.length) return cached.map(enrichHotel);
    return RAW.filter(h=>h.tags.length>0).map(enrichHotel).sort((a,b)=>b.score-a.score);
  };

  const [view,      setView]      = useState("home");
  const [cat,       setCat]       = useState("accommodations");
  const [l1,        setL1]        = useState("Semua Provinsi");
  const [tag,       setTag]       = useState(null);
  const [search,    setSearch]    = useState("");
  const [sel,       setSel]       = useState(null);
  const [drop,      setDrop]      = useState(false);
  const [saved,     setSavedSt]   = useState(getSaved);
  const [hotels,    setHotels]    = useState(initHotels);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminErr,  setAdminErr]  = useState("");
  const [isAdmin,   setIsAdmin]   = useState(false);
  const [adminTab,  setAdminTab]  = useState("list");
  const [csvStatus, setCsvStatus] = useState(null); // null | loading | success | error
  const [csvMsg,    setCsvMsg]    = useState("");
  const fileRef = useRef();

  const toggleSave = useCallback(id => {
    setSavedSt(prev => {
      const next = prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id];
      setSavedLS(next); return next;
    });
  },[]);

  const adminLogin = () => {
    if(adminUser===ADMIN_USER && adminPass===ADMIN_PASS) { setIsAdmin(true); setView("adminPanel"); setAdminErr(""); }
    else setAdminErr("Username atau password salah.");
  };

  const togglePublish = poi_id => setHotels(prev => {
    const next = prev.map(h=>h.poi_id===poi_id?{...h,published:!h.published}:h);
    setHotelsLS(next); return next;
  });

  // ── CSV Upload Handler ─────────────────────────────────────────────────────
  const handleCSV = e => {
    const file = e.target.files[0];
    if(!file) return;
    setCsvStatus("loading"); setCsvMsg("Membaca file CSV...");
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const rows = parseCSV(ev.target.result);
        if(!rows.length) throw new Error("File CSV kosong atau format salah.");
        const validRows = rows.filter(r => (r.poi_name||r.name||"").trim());
        if(!validRows.length) throw new Error("Tidak ada baris data valid ditemukan. Pastikan kolom poi_name terisi.");
        const newHotels = validRows.map(csvRowToHotel).map(enrichHotel).sort((a,b)=>b.score-a.score);
        setHotels(newHotels);
        setHotelsLS(newHotels);
        setCsvStatus("success");
        setCsvMsg(`✓ Berhasil! ${newHotels.length} brand diimport. Data lama digantikan (Replace Mode).`);
      } catch(err) {
        setCsvStatus("error");
        setCsvMsg("✗ Error: " + err.message);
      }
    };
    reader.readAsText(file, "UTF-8");
    e.target.value = "";
  };

  const resetToDefault = () => {
    const def = RAW.filter(h=>h.tags.length>0).map(enrichHotel).sort((a,b)=>b.score-a.score);
    setHotels(def); setHotelsLS(def);
    setCsvStatus("success"); setCsvMsg(`✓ Data direset ke default (${def.length} brand).`);
  };

  const filtered = useMemo(()=>{
    let d=hotels.filter(h=>h.published);
    if(l1!=="Semua Provinsi") d=d.filter(h=>h.l1===l1);
    if(tag) d=d.filter(h=>h.tags.includes(tag));
    if(search.trim()){const q=search.toLowerCase();d=d.filter(h=>h.name.toLowerCase().includes(q)||h.l2.toLowerCase().includes(q)||h.l1.toLowerCase().includes(q));}
    return d;
  },[hotels,l1,tag,search]);

  const savedHotels = useMemo(()=>hotels.filter(h=>saved.includes(h.poi_id)),[hotels,saved]);
  const displayList = view==="saved" ? savedHotels : filtered;

  // ── Admin Panel ─────────────────────────────────────────────────────────────
  if(view==="adminPanel" && isAdmin) return (
    <div style={{...S.root,background:"#0C1220"}}>
      <div style={S.noise}/>
      <header style={{...S.header,paddingBottom:12}}>
        <div style={S.topBar}>
          <img src={LOGO_SRC} alt="adtreeGO" style={{height:26,width:"auto"}}/>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={{fontSize:10,color:BRAND.yellow,background:BRAND.yellowDim,border:`1px solid ${BRAND.yellowBorder}`,borderRadius:20,padding:"3px 10px",fontWeight:700,letterSpacing:"0.1em"}}>ADMIN</div>
            <button onClick={()=>{setIsAdmin(false);setView("home");}} style={{background:"#E8547A18",border:"1px solid #E8547A44",color:BRAND.red,fontSize:11,fontWeight:700,borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>Logout</button>
          </div>
        </div>
        <div style={{fontSize:20,fontWeight:800,color:BRAND.text,marginTop:12}}>Panel Admin</div>
        <div style={{fontSize:11,color:BRAND.textMuted,marginTop:2}}>Kelola brand · Upload CSV · Publish / Unpublish</div>
      </header>

      <div style={{display:"flex",borderBottom:`1px solid ${BRAND.cardBorder}`,margin:"0 0"}}>
        {[["list","📋 Brand List"],["upload","📤 Upload CSV"],["add","➕ Tambah"]].map(([id,lbl])=>(
          <button key={id} onClick={()=>setAdminTab(id)} style={{flex:1,padding:"11px 4px",background:"transparent",border:"none",cursor:"pointer",fontSize:11,fontWeight:700,color:adminTab===id?BRAND.yellow:BRAND.textMuted,borderBottom:`2px solid ${adminTab===id?BRAND.yellow:"transparent"}`}}>{lbl}</button>
        ))}
      </div>

      {/* ── TAB: CSV Upload ── */}
      {adminTab==="upload" && (
        <div style={{padding:"20px 20px 90px"}}>
          <div style={{fontSize:14,fontWeight:800,color:BRAND.text,marginBottom:4}}>Upload CSV — Replace Mode</div>
          <div style={{fontSize:12,color:BRAND.textMuted,marginBottom:20,lineHeight:1.6}}>Upload CSV sesuai template. Semua data yang ada akan <span style={{color:BRAND.red,fontWeight:700}}>digantikan sepenuhnya</span> dengan data dari file baru.</div>

          {/* Industry selector (for future) */}
          <div style={{background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:12,padding:"12px 14px",marginBottom:16}}>
            <div style={{fontSize:10,fontWeight:700,color:BRAND.textMuted,letterSpacing:"0.1em",marginBottom:8}}>INDUSTRI</div>
            <div style={{display:"flex",gap:8}}>
              {["Accommodations","Dining (Segera)","Things to Do (Segera)"].map((ind,i)=>(
                <div key={ind} style={{fontSize:11,fontWeight:700,padding:"5px 12px",borderRadius:20,border:`1px solid ${i===0?BRAND.yellow:BRAND.cardBorder}`,color:i===0?BRAND.yellow:BRAND.textMuted,background:i===0?BRAND.yellowDim:"transparent"}}>{ind}</div>
              ))}
            </div>
          </div>

          {/* Upload area */}
          <div
            onClick={()=>fileRef.current?.click()}
            style={{border:`2px dashed ${csvStatus==="success"?BRAND.green:csvStatus==="error"?BRAND.red:BRAND.cardBorder}`,borderRadius:16,padding:"32px 20px",textAlign:"center",cursor:"pointer",background:csvStatus==="success"?BRAND.green+"08":csvStatus==="error"?BRAND.red+"08":BRAND.card,marginBottom:14,transition:"all 0.2s"}}>
            <div style={{fontSize:32,marginBottom:10}}>{csvStatus==="loading"?"⏳":csvStatus==="success"?"✅":csvStatus==="error"?"❌":"📤"}</div>
            <div style={{fontSize:14,fontWeight:700,color:BRAND.text,marginBottom:4}}>
              {csvStatus==="loading"?"Memproses...":csvStatus?"File diproses":"Klik untuk pilih file CSV"}
            </div>
            <div style={{fontSize:11,color:BRAND.textMuted}}>{csvStatus?"":".csv · UTF-8 · Max 5MB"}</div>
            {csvMsg && <div style={{fontSize:12,fontWeight:600,color:csvStatus==="success"?BRAND.green:BRAND.red,marginTop:10,lineHeight:1.5}}>{csvMsg}</div>}
          </div>
          <input ref={fileRef} type="file" accept=".csv,text/csv" onChange={handleCSV} style={{display:"none"}}/>

          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
            {[["Total Brand",hotels.length,"📋"],[`Dipublikasikan`,hotels.filter(h=>h.published).length,"✓"],[`Disembunyikan`,hotels.filter(h=>!h.published).length,"—"]].map(([lbl,val,ico])=>(
              <div key={lbl} style={{background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
                <div style={{fontSize:18}}>{ico}</div>
                <div style={{fontSize:20,fontWeight:800,color:BRAND.yellow,marginTop:4}}>{val}</div>
                <div style={{fontSize:10,color:BRAND.textMuted,marginTop:2}}>{lbl}</div>
              </div>
            ))}
          </div>

          <button onClick={()=>fileRef.current?.click()} style={{...S.cta,marginBottom:10}}>📤 Pilih File CSV</button>
          <button onClick={resetToDefault} style={{display:"block",width:"100%",padding:"12px",borderRadius:12,border:`1px solid ${BRAND.cardBorder}`,background:"transparent",color:BRAND.textMuted,fontSize:13,fontWeight:600,cursor:"pointer"}}>↺ Reset ke Data Default</button>

          {/* Template reminder */}
          <div style={{background:"#F5C84208",border:`1px solid ${BRAND.yellowBorder}`,borderRadius:12,padding:"12px 14px",marginTop:16}}>
            <div style={{fontSize:11,fontWeight:700,color:BRAND.yellow,marginBottom:4}}>📎 Template CSV</div>
            <div style={{fontSize:11,color:BRAND.textMuted,lineHeight:1.6}}>Gunakan file template Excel yang sudah disediakan. Kolom wajib: <span style={{color:BRAND.text,fontWeight:600}}>poi_name, l1_region, l2_region, star_rating, price_tier, published</span>, dan minimal 1 kolom kampanye bertanda Yes.</div>
          </div>
        </div>
      )}

      {/* ── TAB: Brand List ── */}
      {adminTab==="list" && (
        <div style={{padding:"12px 16px 90px"}}>
          <div style={{fontSize:11,color:BRAND.textMuted,marginBottom:12}}>
            {hotels.length} brand total · {hotels.filter(h=>h.published).length} aktif · {hotels.filter(h=>!h.published).length} hidden
          </div>
          {hotels.map(h=>(
            <div key={h.poi_id} style={{...S.listCard,opacity:h.published?1:0.4,marginBottom:8}}>
              <img src={h.thumb} alt={h.name} style={S.listThumb} onError={e=>e.target.src=FALLBACK_THUMBS[0]}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:12,fontWeight:700,color:BRAND.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.name}</div>
                <div style={{fontSize:10,color:BRAND.textMuted,marginTop:1}}>{h.l2}, {h.l1}</div>
                <div style={{display:"flex",gap:6,marginTop:4,alignItems:"center"}}>
                  <ScoreBadge val={h.score}/>
                  <Stars count={h.star}/>
                  <span style={{fontSize:9,color:BRAND.textMuted}}>{h.tags.length} kampanye</span>
                </div>
              </div>
              <div style={{flexShrink:0,textAlign:"right"}}>
                <div style={{fontSize:10,fontWeight:700,color:h.published?BRAND.green:BRAND.red,marginBottom:5}}>{h.published?"✓ Aktif":"✗ Hidden"}</div>
                <button onClick={()=>togglePublish(h.poi_id)} style={{fontSize:10,fontWeight:700,background:h.published?"#E8547A14":"#2DD4A414",border:`1px solid ${h.published?BRAND.red:BRAND.green}44`,color:h.published?BRAND.red:BRAND.green,borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>
                  {h.published?"Hide":"Publish"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB: Add Brand ── */}
      {adminTab==="add" && (
        <div style={{padding:"20px 20px 90px"}}>
          <AddBrandForm onAdd={h=>{
            const enriched = enrichHotel(h);
            setHotels(prev=>{const next=[enriched,...prev].sort((a,b)=>b.score-a.score); setHotelsLS(next); return next;});
            setAdminTab("list");
          }}/>
        </div>
      )}

      <nav style={S.nav}>
        {[["📋","List","list"],["📤","Upload","upload"],["➕","Tambah","add"],["🚪","Keluar","logout"]].map(([ic,lb,id])=>(
          <div key={id} style={{...S.navItem,...(adminTab===id?S.navActive:{})}} onClick={()=>id==="logout"?(setIsAdmin(false),setView("home")):setAdminTab(id)}>
            <span style={{fontSize:18}}>{ic}</span><span style={S.navLbl}>{lb}</span>
          </div>
        ))}
      </nav>
    </div>
  );

  // ── Admin Login ─────────────────────────────────────────────────────────────
  if(view==="admin") return (
    <div style={{...S.root,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"40px 28px",minHeight:"100vh"}}>
      <div style={S.noise}/>
      <img src={LOGO_SRC} alt="adtreeGO" style={{height:30,width:"auto",marginBottom:36,position:"relative",zIndex:1}}/>
      <div style={{background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:20,padding:"32px 28px",width:"100%",maxWidth:340,position:"relative",zIndex:1}}>
        <div style={{fontSize:18,fontWeight:800,color:BRAND.text,marginBottom:4}}>Admin Login</div>
        <div style={{fontSize:12,color:BRAND.textMuted,marginBottom:24}}>Akses terbatas untuk tim Adtree</div>
        <label style={S.formLabel}>Username</label>
        <input value={adminUser} onChange={e=>setAdminUser(e.target.value)} placeholder="" style={S.formInput} onKeyDown={e=>e.key==="Enter"&&adminLogin()}/>
        <label style={{...S.formLabel,marginTop:14}}>Password</label>
        <input value={adminPass} onChange={e=>setAdminPass(e.target.value)} type="password" placeholder="" style={S.formInput} onKeyDown={e=>e.key==="Enter"&&adminLogin()}/>
        {adminErr&&<div style={{color:BRAND.red,fontSize:11,marginTop:8,fontWeight:600}}>{adminErr}</div>}
        <button onClick={adminLogin} style={{...S.cta,marginTop:20}}>Masuk</button>
        <button onClick={()=>setView("home")} style={{display:"block",width:"100%",marginTop:10,padding:"12px",background:"transparent",border:`1px solid ${BRAND.cardBorder}`,borderRadius:12,color:BRAND.textMuted,fontSize:13,fontWeight:600,cursor:"pointer"}}>Kembali ke App</button>
      </div>
    </div>
  );

  // ── Main Public UI ──────────────────────────────────────────────────────────
  return (
    <div style={S.root}>
      <div style={S.noise}/>
      <header style={S.header}>
        <div style={S.topBar}>
          <img src={LOGO_SRC} alt="adtreeGO" style={{height:26,width:"auto",display:"block"}}/>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <div style={S.headerPill}>Brand Opportunities</div>

          </div>
        </div>
        <div style={S.heroTitle}>Temukan Brand<br/><span style={S.heroAccent}>Terbaik</span> Untukmu</div>
        <div style={S.heroSub}>Pilih kampanye, buat konten, dan mulai cuan bareng AdtreeGO.</div>
        <div style={S.searchWrap}>
          <span style={{fontSize:14,opacity:0.4}}>🔍</span>
          <input placeholder="Cari hotel, kota, atau provinsi..." value={search} onChange={e=>setSearch(e.target.value)} style={S.searchInput}/>
          {search&&<button onClick={()=>setSearch("")} style={{background:"none",border:"none",color:BRAND.textMuted,cursor:"pointer",fontSize:14,padding:0}}>✕</button>}
        </div>
      </header>

      {view==="saved"&&(
        <div style={{padding:"12px 16px 0"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,background:BRAND.yellowDim,border:`1px solid ${BRAND.yellowBorder}`,borderRadius:12,padding:"10px 14px"}}>
            <span>🔖</span><span style={{fontSize:12,fontWeight:700,color:BRAND.yellow}}>Brand Tersimpan</span>
            <span style={{fontSize:11,color:BRAND.textMuted,marginLeft:"auto"}}>{savedHotels.length} brand</span>
          </div>
        </div>
      )}

      <div style={S.catWrap}>
        {CATS.map(c=>(
          <button key={c.id} style={{...S.catBtn,...(cat===c.id&&view==="home"?S.catActive:{})}} onClick={()=>{setCat(c.id);setView("home");}}>
            <span>{c.icon}</span><span style={S.catTxt}>{c.label}</span>
            {!c.live&&<span style={S.comingSoon}>Segera</span>}
          </button>
        ))}
      </div>
      <div style={S.divider}/>

      {view==="home"&&cat!=="accommodations" ? (
        <div style={S.csScreen}>
          <div style={S.csCircle}>{CATS.find(c=>c.id===cat)?.icon}</div>
          <div style={S.csTitle}>Segera Hadir</div>
          <div style={S.csSub}>Kategori <strong style={{color:BRAND.yellow}}>{CATS.find(c=>c.id===cat)?.label}</strong> sedang disiapkan.</div>
        </div>
      ):(
        <>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px 0",position:"relative",zIndex:10}}>
            <div style={{position:"relative"}}>
              <button style={S.regionBtn} onClick={()=>setDrop(!drop)}>
                <span>📍</span>
                <span style={{fontSize:12,fontWeight:600,color:BRAND.textSub,maxWidth:130,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l1==="Semua Provinsi"?"Semua Provinsi":l1}</span>
                <span style={{fontSize:9,color:BRAND.textMuted}}>{drop?"▲":"▼"}</span>
              </button>
              {drop&&(
                <div style={S.dropdown}>
                  {ALL_L1.map(r=>(
                    <div key={r} style={{...S.dropItem,...(l1===r?S.dropActive:{})}} onClick={()=>{setL1(r);setDrop(false);}}>
                      <span>{r==="Semua Provinsi"?"🗺️":"📍"}</span><span style={{flex:1}}>{r}</span>
                      {l1===r&&<span style={{color:BRAND.yellow}}>✓</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={S.countBadge}>{displayList.length} brand</div>
          </div>

          <div style={S.tagRow}>
            <button style={{...S.tagBtn,...(tag===null?S.tagActive:{})}} onClick={()=>setTag(null)}>Semua</button>
            {ALL_TAGS.map(t=>(
              <button key={t} style={{...S.tagBtn,...(tag===t?S.tagActive:{})}} onClick={()=>setTag(tag===t?null:t)}>
                {TAG_ICON[t]} {t.split(" ")[0]}
              </button>
            ))}
          </div>

          {view==="home"&&!search&&!tag&&l1==="Semua Provinsi"&&filtered.length>0&&(
            <section style={{padding:"14px 0 0"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px 10px"}}>
                <span style={S.secHeadTxt}>🏆 Skor Tertinggi</span>
                <span style={S.secHeadCount}>Algoritma Adtree</span>
              </div>
              <div style={{display:"flex",gap:10,overflowX:"auto",scrollbarWidth:"none",padding:"0 16px 4px"}}>
                {filtered.slice(0,3).map((h,i)=>(
                  <div key={h.poi_id} style={{flexShrink:0,width:172,background:BRAND.card,borderRadius:14,overflow:"hidden",cursor:"pointer",border:`1px solid ${i===0?BRAND.yellow+"55":BRAND.cardBorder}`}} onClick={()=>setSel(h)}>
                    <div style={{position:"relative",height:108}}>
                      <img src={h.photo} alt={h.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>e.target.src=FALLBACK_PHOTOS[0]}/>
                      <div style={{position:"absolute",top:8,left:8,fontSize:10,fontWeight:800,borderRadius:20,padding:"2px 8px",background:i===0?BRAND.yellow:i===1?"#C0C0C0":"#CD7F32",color:"#0A0C10"}}>#{i+1}</div>
                      <div style={{position:"absolute",bottom:8,right:8,fontSize:9,fontWeight:700,borderRadius:20,padding:"2px 7px",color:TIER_COLOR[h.price_tier],background:TIER_COLOR[h.price_tier]+"25",border:`1px solid ${TIER_COLOR[h.price_tier]}55`}}>{TIER_LABEL[h.price_tier]}</div>
                    </div>
                    <div style={{padding:"10px 12px 14px"}}>
                      <div style={{fontSize:12,fontWeight:700,color:BRAND.text,lineHeight:1.3,marginBottom:3,overflow:"hidden",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{h.name}</div>
                      <div style={{fontSize:10,color:BRAND.textMuted,marginBottom:4}}>📍 {h.city_display||h.l2}</div>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><Stars count={h.star}/><ScoreBadge val={h.score}/></div>
                      <div style={{fontSize:13,fontWeight:800,color:BRAND.yellow,marginTop:5}}>{fmtIdr(h.aov_idr)}<span style={{fontSize:10,fontWeight:400,color:BRAND.textMuted,marginLeft:2}}>/malam</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section style={{padding:"14px 16px 0"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingBottom:10}}>
              <span style={S.secHeadTxt}>{view==="saved"?"🔖 Tersimpan":tag?`${TAG_ICON[tag]} ${tag}`:search?`"${search}"`:cat==="accommodations"?"Semua Akomodasi":""}</span>
              <span style={S.secHeadCount}>{displayList.length}</span>
            </div>
            {displayList.length===0&&(
              <div style={S.empty}>
                {view==="saved"
                  ? <span>Belum ada brand tersimpan.<br/>Tap 🔖 pada brand untuk menyimpannya.</span>
                  : "Tidak ada brand ditemukan."}
              </div>
            )}
            {displayList.map(h=>(
              <div key={h.poi_id} style={S.listCard} onClick={()=>setSel(h)}>
                <div style={{position:"relative",flexShrink:0}}>
                  <img src={h.thumb} alt={h.name} style={S.listThumb} onError={e=>e.target.src=FALLBACK_THUMBS[0]}/>
                  <div style={{position:"absolute",left:42,top:42,width:11,height:11,borderRadius:"50%",border:`2px solid ${BRAND.bg}`,background:TIER_COLOR[h.price_tier]}}/>
                </div>
                <div style={S.listMeta}>
                  <div style={{fontSize:13,fontWeight:700,color:BRAND.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{h.name}</div>
                  <div style={{fontSize:10,color:BRAND.textMuted,marginTop:2,marginBottom:4}}>📍 {h.city_display||h.l2}, {h.l1}</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",alignItems:"center"}}>
                    {h.tags.slice(0,2).map(t=>(
                      <span key={t} style={{fontSize:9,fontWeight:600,background:"#1E2A45",color:BRAND.textMuted,borderRadius:10,padding:"2px 6px",border:`1px solid ${BRAND.cardBorder}`}}>{TAG_ICON[t]} {t.split(" ")[0]}</span>
                    ))}
                    <ScoreBadge val={h.score}/>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                  <button onClick={e=>{e.stopPropagation();toggleSave(h.poi_id);}} style={{background:saved.includes(h.poi_id)?BRAND.yellowDim:"transparent",border:`1px solid ${saved.includes(h.poi_id)?BRAND.yellow:BRAND.cardBorder}`,borderRadius:8,padding:"5px 7px",cursor:"pointer",fontSize:14,color:saved.includes(h.poi_id)?BRAND.yellow:BRAND.textMuted,lineHeight:1}}>🔖</button>
                  <div style={{fontSize:12,fontWeight:800,color:BRAND.yellow}}>{fmtIdr(h.aov_idr)}</div>
                  <div style={{fontSize:9,color:BRAND.textMuted}}>/malam</div>
                </div>
              </div>
            ))}
            <div style={{height:8}}/>
          </section>
        </>
      )}

      <nav style={S.nav}>
        <div style={{...S.navItem,...(view==="home"?S.navActive:{})}} onClick={()=>setView("home")}><span style={{fontSize:18}}>⊞</span><span style={S.navLbl}>Beranda</span></div>
        <div style={{...S.navItem,...(view==="saved"?S.navActive:{})}} onClick={()=>setView("saved")}>
          <span style={{fontSize:18,position:"relative"}}>🔖
            {saved.length>0&&<span style={{position:"absolute",top:-4,right:-6,background:BRAND.yellow,color:"#0A0C10",fontSize:8,fontWeight:800,borderRadius:"50%",width:14,height:14,display:"flex",alignItems:"center",justifyContent:"center"}}>{saved.length}</span>}
          </span>
          <span style={S.navLbl}>Tersimpan</span>
        </div>
        <div style={S.navItem} onClick={()=>setView("admin")}><span style={{fontSize:18}}>⚙️</span><span style={S.navLbl}>Admin</span></div>
      </nav>

      {sel&&(
        <div style={S.overlay} onClick={()=>setSel(null)}>
          <div style={S.sheet} onClick={e=>e.stopPropagation()}>
            <div style={S.handle}/>
            <div style={{position:"relative",height:195,margin:"10px 16px 0",borderRadius:16,overflow:"hidden"}}>
              <img src={sel.photo} alt={sel.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}} onError={e=>e.target.src=FALLBACK_PHOTOS[0]}/>
              <div style={{position:"absolute",inset:0,background:"linear-gradient(to top, rgba(10,15,35,0.85) 0%, transparent 55%)"}}/>
              <div style={{position:"absolute",bottom:12,left:12,right:12,display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
                <div style={{fontSize:11,fontWeight:700,borderRadius:20,padding:"4px 10px",color:TIER_COLOR[sel.price_tier],background:TIER_COLOR[sel.price_tier]+"25",border:`1px solid ${TIER_COLOR[sel.price_tier]}55`}}>{TIER_LABEL[sel.price_tier]}</div>
                <ScoreBadge val={sel.score}/>
              </div>
            </div>
            <div style={{padding:"16px 20px 36px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:18,fontWeight:800,color:BRAND.text,lineHeight:1.2,marginBottom:3}}>{sel.name}</div>
                  <div style={{fontSize:12,color:BRAND.textMuted}}>📍 {sel.city_display||sel.l2}, {sel.l1}</div>
                </div>
                <button onClick={()=>toggleSave(sel.poi_id)} style={{background:saved.includes(sel.poi_id)?BRAND.yellowDim:"transparent",border:`1px solid ${saved.includes(sel.poi_id)?BRAND.yellow:BRAND.cardBorder}`,borderRadius:10,padding:"7px 10px",cursor:"pointer",fontSize:18,marginLeft:10,flexShrink:0}}>🔖</button>
              </div>
              <div style={{background:"#F5C84209",border:`1px solid #F5C84230`,borderRadius:12,padding:"12px 14px",marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:10,fontWeight:800,color:BRAND.yellow,letterSpacing:"0.1em"}}>🎁 PROMO AKTIF</span>
                  <span style={{fontSize:11,fontWeight:800,color:BRAND.green,background:"#2DD4A422",borderRadius:10,padding:"2px 8px"}}>Max 40%</span>
                </div>
                <div style={{fontSize:13,fontWeight:600,color:BRAND.textSub,lineHeight:1.5}}>{sel.promo}</div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
                {[["💰","AOV/Malam",fmtIdr(sel.aov_idr)],["⭐","Bintang",sel.star>0?sel.star+" ★":"N/A"],["🗺️","Provinsi",sel.l1.length>12?sel.l1.slice(0,11)+"…":sel.l1],["📍","Kota/Kab",(sel.city_display||sel.l2).length>10?(sel.city_display||sel.l2).slice(0,9)+"…":(sel.city_display||sel.l2)],["📊","Harga",TIER_LABEL[sel.price_tier]],["🎯","Skor",sel.score+" pt"]].map(([ico,lbl,val])=>(
                  <div key={lbl} style={{background:"#1A2640",borderRadius:10,padding:"10px",display:"flex",flexDirection:"column",gap:3}}>
                    <span style={{fontSize:14}}>{ico}</span>
                    <div style={{fontSize:9,color:BRAND.textMuted,letterSpacing:"0.08em",fontWeight:700}}>{lbl}</div>
                    <div style={{fontSize:11,fontWeight:700,color:BRAND.textSub}}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{fontSize:11,fontWeight:700,color:BRAND.textMuted,letterSpacing:"0.1em",marginBottom:8}}>Jenis Kampanye</div>
              <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:18}}>
                {sel.tags.map(t=>(
                  <div key={t} style={{background:"#1A2640",borderRadius:10,padding:"10px 14px",display:"flex",alignItems:"center",gap:10,border:`1px solid ${BRAND.cardBorder}`}}>
                    <span style={{fontSize:18}}>{TAG_ICON[t]}</span>
                    <span style={{fontSize:13,fontWeight:600,color:BRAND.textSub,flex:1}}>{t}</span>
                    <span style={{fontSize:11,color:BRAND.green,fontWeight:800}}>✓</span>
                  </div>
                ))}
              </div>
              {sel.wa_link
                  ? <a href={`https://wa.me/${sel.wa_link.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer" style={{...S.cta,display:"flex",alignItems:"center",justifyContent:"center",gap:8,textDecoration:"none"}}>
                      <span style={{fontSize:18}}>💬</span> Dapatkan Informasi Lebih Lanjut
                    </a>
                  : <div style={{...S.cta,opacity:0.4,textAlign:"center",cursor:"default",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                      <span style={{fontSize:18}}>💬</span> Informasi Belum Tersedia
                    </div>
                }
              <div style={{textAlign:"center",fontSize:10,color:BRAND.textMuted,marginTop:8}}>Powered by <span style={{color:BRAND.yellow,fontWeight:700}}>AdtreeGO</span> · TikTok Indonesia</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddBrandForm({onAdd}) {
  const [f,setF]=useState({name:"",l1:"Jakarta",l2:"",city_display:"",star:"4",price_tier:"Mid [30,50]",aov_usd:"40",photo_url:"",promo_text:"",wa_link:"",tags:[]});
  const toggle=t=>setF(p=>({...p,tags:p.tags.includes(t)?p.tags.filter(x=>x!==t):[...p.tags,t]}));
  const submit=()=>{
    if(!f.name.trim()||!f.l2.trim()){alert("Nama hotel dan kota wajib diisi.");return;}
    onAdd({poi_id:"manual_"+Date.now(),name:f.name,l1:f.l1,l2:f.l2,city_display:f.city_display||f.l2,star:parseFloat(f.star)||4,price_tier:f.price_tier,aov_idr:Math.round((parseFloat(f.aov_usd)||40)*18000),tags:f.tags,photo:f.photo_url,promo:f.promo_text,wa_link:f.wa_link,published:true});
  };
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{fontSize:14,fontWeight:800,color:BRAND.text}}>Tambah Brand Manual</div>
      {[["Nama Hotel *","text",f.name,"name"],["Kota / Kab *","text",f.l2,"l2"],["Tampilan Kota","text",f.city_display,"city_display"],["URL Foto","url",f.photo_url,"photo_url"],["WhatsApp (cth: 6281234567890)","tel",f.wa_link,"wa_link"],["Teks Promo (opsional)","text",f.promo_text,"promo_text"]].map(([lbl,type,val,key])=>(
        <div key={key}><label style={S.formLabel}>{lbl}</label>
          <input value={val} onChange={e=>setF(p=>({...p,[key]:e.target.value}))} style={S.formInput} type={type} placeholder={lbl.replace(" *","")}/>
        </div>
      ))}
      <div><label style={S.formLabel}>Provinsi</label>
        <select value={f.l1} onChange={e=>setF(p=>({...p,l1:e.target.value}))} style={{...S.formInput,height:40}}>
          {ALL_L1.filter(r=>r!=="Semua Provinsi").map(r=><option key={r}>{r}</option>)}
        </select>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div><label style={S.formLabel}>Bintang</label>
          <select value={f.star} onChange={e=>setF(p=>({...p,star:e.target.value}))} style={{...S.formInput,height:40}}>
            {["1","1.5","2","2.5","3","3.5","4","4.5","5"].map(s=><option key={s} value={s}>{s} ★</option>)}
          </select>
        </div>
        <div><label style={S.formLabel}>AOV (USD)</label>
          <input value={f.aov_usd} onChange={e=>setF(p=>({...p,aov_usd:e.target.value}))} style={S.formInput} type="number" placeholder="40"/>
        </div>
      </div>
      <div><label style={S.formLabel}>Tier Harga</label>
        <select value={f.price_tier} onChange={e=>setF(p=>({...p,price_tier:e.target.value}))} style={{...S.formInput,height:40}}>
          {["Low [0,30]","Mid [30,50]","High [>50]"].map(t=><option key={t}>{t}</option>)}
        </select>
      </div>
      <div><label style={S.formLabel}>Kampanye Aktif</label>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:6}}>
          {ALL_TAGS.map(t=>(
            <button key={t} onClick={()=>toggle(t)} style={{fontSize:10,fontWeight:600,padding:"5px 10px",borderRadius:20,border:`1px solid ${f.tags.includes(t)?BRAND.yellow:BRAND.cardBorder}`,background:f.tags.includes(t)?BRAND.yellowDim:"transparent",color:f.tags.includes(t)?BRAND.yellow:BRAND.textMuted,cursor:"pointer"}}>
              {TAG_ICON[t]} {t}
            </button>
          ))}
        </div>
      </div>
      <button onClick={submit} style={{...S.cta,marginTop:8}}>✓ Simpan Brand</button>
    </div>
  );
}

const S = {
  root:{minHeight:"100vh",background:BRAND.bg,color:BRAND.text,fontFamily:"'DM Sans','Helvetica Neue',sans-serif",maxWidth:430,margin:"0 auto",position:"relative",overflowX:"hidden",paddingBottom:90},
  noise:{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")"},
  header:{padding:"48px 20px 20px",background:`linear-gradient(180deg, #0C1120 0%, ${BRAND.bg} 100%)`,position:"relative",zIndex:2},
  topBar:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},
  headerPill:{fontSize:10,fontWeight:700,letterSpacing:"0.1em",color:BRAND.yellow,background:BRAND.yellowDim,border:`1px solid ${BRAND.yellowBorder}`,borderRadius:20,padding:"4px 10px"},
  heroTitle:{fontSize:26,fontWeight:800,color:BRAND.text,lineHeight:1.2,marginBottom:6,letterSpacing:"-0.3px"},
  heroAccent:{color:BRAND.yellow},
  heroSub:{fontSize:12,color:BRAND.textMuted,lineHeight:1.6,marginBottom:16},
  searchWrap:{display:"flex",alignItems:"center",background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:12,padding:"10px 14px",gap:8},
  searchInput:{flex:1,background:"transparent",border:"none",outline:"none",color:BRAND.text,fontSize:13,fontFamily:"inherit"},
  catWrap:{display:"flex",padding:"0 16px",position:"relative",zIndex:2},
  catBtn:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"10px 4px",background:"transparent",border:"none",cursor:"pointer",borderBottom:`2px solid ${BRAND.cardBorder}`,color:BRAND.textMuted,position:"relative"},
  catActive:{color:BRAND.yellow,borderBottomColor:BRAND.yellow},
  catTxt:{fontSize:11,fontWeight:700,letterSpacing:"0.04em"},
  comingSoon:{position:"absolute",top:5,right:4,fontSize:7,background:"#F5A62333",color:"#F5A623",borderRadius:10,padding:"1px 4px",fontWeight:800},
  divider:{height:1,background:BRAND.cardBorder},
  csScreen:{display:"flex",flexDirection:"column",alignItems:"center",padding:"80px 30px",textAlign:"center"},
  csCircle:{fontSize:52,marginBottom:18,background:BRAND.card,borderRadius:"50%",width:90,height:90,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${BRAND.cardBorder}`},
  csTitle:{fontSize:22,fontWeight:800,color:BRAND.text,marginBottom:8},
  csSub:{fontSize:13,color:BRAND.textMuted,lineHeight:1.7},
  regionBtn:{display:"flex",alignItems:"center",gap:6,background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:10,padding:"7px 12px",cursor:"pointer",color:BRAND.text},
  dropdown:{position:"absolute",top:"calc(100% + 6px)",left:0,width:220,background:"#18243D",border:`1px solid ${BRAND.cardBorder}`,borderRadius:14,maxHeight:260,overflowY:"auto",boxShadow:"0 8px 32px rgba(0,0,0,0.6)",zIndex:100},
  dropItem:{padding:"10px 14px",fontSize:12,color:BRAND.textSub,cursor:"pointer",display:"flex",alignItems:"center",gap:8,borderBottom:`1px solid ${BRAND.cardBorder}`},
  dropActive:{color:BRAND.yellow,background:BRAND.yellowDim},
  countBadge:{fontSize:11,fontWeight:700,color:BRAND.yellow,background:BRAND.yellowDim,borderRadius:20,padding:"4px 10px",border:`1px solid ${BRAND.yellowBorder}`},
  tagRow:{display:"flex",gap:6,padding:"10px 16px 0",overflowX:"auto",scrollbarWidth:"none"},
  tagBtn:{flexShrink:0,padding:"5px 12px",borderRadius:20,border:`1px solid ${BRAND.cardBorder}`,background:"transparent",color:BRAND.textMuted,fontSize:11,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"},
  tagActive:{background:BRAND.yellow,color:"#0A0C10",borderColor:"transparent"},
  secHeadTxt:{fontSize:12,fontWeight:700,color:BRAND.textSub,letterSpacing:"0.06em"},
  secHeadCount:{fontSize:12,fontWeight:800,color:BRAND.yellow},
  listCard:{display:"flex",alignItems:"center",gap:12,background:BRAND.card,borderRadius:14,padding:"12px 12px",cursor:"pointer",border:`1px solid ${BRAND.cardBorder}`,marginBottom:8,position:"relative"},
  listThumb:{width:52,height:52,borderRadius:12,objectFit:"cover",flexShrink:0},
  listMeta:{flex:1,minWidth:0},
  empty:{textAlign:"center",padding:"48px 20px",color:BRAND.textMuted,lineHeight:1.8,fontSize:13},
  nav:{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:"#0C1120",borderTop:`1px solid ${BRAND.cardBorder}`,display:"flex",zIndex:200,padding:"10px 0 24px"},
  navItem:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",color:BRAND.cardBorder,position:"relative"},
  navActive:{color:BRAND.yellow},
  navLbl:{fontSize:9,fontWeight:700,letterSpacing:"0.06em"},
  overlay:{position:"fixed",inset:0,background:"rgba(7,11,22,0.88)",backdropFilter:"blur(10px)",zIndex:300,display:"flex",alignItems:"flex-end"},
  sheet:{width:"100%",maxWidth:430,margin:"0 auto",background:"#14203A",borderRadius:"24px 24px 0 0",maxHeight:"93vh",overflowY:"auto"},
  handle:{width:36,height:4,background:BRAND.cardBorder,borderRadius:2,margin:"14px auto 0"},
  cta:{display:"block",width:"100%",padding:"15px",borderRadius:14,border:"none",fontSize:14,fontWeight:800,color:"#0A0C10",cursor:"pointer",background:BRAND.yellow,letterSpacing:"0.03em"},
  formLabel:{fontSize:11,fontWeight:700,color:BRAND.textMuted,letterSpacing:"0.06em",display:"block",marginBottom:6},
  formInput:{width:"100%",background:BRAND.card,border:`1px solid ${BRAND.cardBorder}`,borderRadius:10,padding:"10px 14px",color:BRAND.text,fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"},
};
