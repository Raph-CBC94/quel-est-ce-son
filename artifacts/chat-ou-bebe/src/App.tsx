import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RefreshCcw, Home } from 'lucide-react';
import Confetti from './components/Confetti';

const CATEGORIES = {
  chatBebe: {
    id: 'chat-bebe',
    title: 'Chat ou Bébé ?',
    subtitle: 'Félins ou humains ?',
    emoji: '🐱👶',
    optionA: { label: 'Chat', emoji: '🐱', key: 'chat' as const },
    optionB: { label: 'Bébé', emoji: '👶', key: 'bebe' as const },
    folder: 'chat-bebe',
    questions: [
      { file: 'sound_01.mp3', answer: 'chat', hint: "Ce miaulement plaintif comme un 'mama'..." },
      { file: 'sound_02.mp3', answer: 'bebe', hint: "Ce cri fin et aigu..." },
      { file: 'sound_03.mp3', answer: 'chat', hint: "Ce hurlement de nuit déchirant..." },
      { file: 'sound_04.mp3', answer: 'bebe', hint: "Ces roucoulements si doux..." },
      { file: 'sound_05.mp3', answer: 'chat', hint: "Ce petit miaulement si fragile..." },
      { file: 'sound_06.mp3', answer: 'bebe', hint: "Ces gémissements plaintifs..." },
      { file: 'sound_07.mp3', answer: 'chat', hint: "Ces trilles staccato rapides..." },
      { file: 'sound_08.mp3', answer: 'bebe', hint: "Ces petits rires perlés..." },
      { file: 'sound_09.mp3', answer: 'chat', hint: "Ces miaulements répétés et exigeants..." },
      { file: 'sound_10.mp3', answer: 'bebe', hint: "Ces 'maaaaa' insistants..." },
      { file: 'sound_11.mp3', answer: 'chat', hint: "Ce grattage discret à la porte..." },
      { file: 'sound_12.mp3', answer: 'bebe', hint: "Ces babillages consonantiques..." },
      { file: 'sound_13.mp3', answer: 'chat', hint: "Ce 'nooon' miaoulé..." },
      { file: 'sound_14.mp3', answer: 'bebe', hint: "Ce cri bref et surpris..." },
      { file: 'sound_15.mp3', answer: 'chat', hint: "Ces cliquetis excités face à la fenêtre..." },
      { file: 'sound_16.mp3', answer: 'bebe', hint: "Ces vocalises mélodieuses..." },
      { file: 'sound_17.mp3', answer: 'chat', hint: "Ce mrrrp de bienvenue..." },
      { file: 'sound_18.mp3', answer: 'bebe', hint: "Ces plaintes de faim répétées..." },
      { file: 'sound_19.mp3', answer: 'chat', hint: "Ces appels désespérés à son humain..." },
      { file: 'sound_20.mp3', answer: 'bebe', hint: "Ces cris de joie stridents..." },
      { file: 'sound_21.mp3', answer: 'chat', hint: "Ce hurlement nocturne dramatique..." },
      { file: 'sound_22.mp3', answer: 'bebe', hint: "Ce fredonnement satisfait..." },
      { file: 'sound_23.mp3', answer: 'chat', hint: "Ce tout petit miaou interrogatif..." },
      { file: 'sound_24.mp3', answer: 'bebe', hint: "Ces pleurs rythmés..." },
      { file: 'sound_25.mp3', answer: 'chat', hint: "Ces miaous pour réveiller le maître..." },
      { file: 'sound_26.mp3', answer: 'bebe', hint: "Ces sons interrogatifs montants..." },
      { file: 'sound_27.mp3', answer: 'chat', hint: "Cette plainte interminable et plaintive..." },
      { file: 'sound_28.mp3', answer: 'bebe', hint: "Ce cri de protestation unique..." },
      { file: 'sound_29.mp3', answer: 'chat', hint: "Ce claquement de dents devant une proie..." },
      { file: 'sound_30.mp3', answer: 'bebe', hint: "Ces rires aigus et perlés..." },
      { file: 'sound_31.mp3', answer: 'chat', hint: "Ce hurlement chez le vétérinaire..." },
      { file: 'sound_32.mp3', answer: 'bebe', hint: "Ces pleurs endormis..." },
      { file: 'sound_33.mp3', answer: 'chat', hint: "Ces miaous réclamant la gamelle..." },
      { file: 'sound_34.mp3', answer: 'bebe', hint: "Ces petits bruits de nez..." },
      { file: 'sound_35.mp3', answer: 'chat', hint: "Ce grognement mécontent..." },
      { file: 'sound_36.mp3', answer: 'bebe', hint: "Ce cri de surprise soudain..." },
      { file: 'sound_37.mp3', answer: 'chat', hint: "Ce tout mini miaou à peine audible..." },
      { file: 'sound_38.mp3', answer: 'bebe', hint: "Ces petits bruits de tétée..." },
      { file: 'sound_39.mp3', answer: 'chat', hint: "Ces miaous autoritaires et insistants..." },
      { file: 'sound_40.mp3', answer: 'bebe', hint: "Ces plaintes d'impatience..." },
      { file: 'sound_41.mp3', answer: 'chat', hint: "Ce ronron-miaou hybride satisfait..." },
      { file: 'sound_42.mp3', answer: 'bebe', hint: "Ces explorations vocales mélodieuses..." },
      { file: 'sound_43.mp3', answer: 'chat', hint: "Ce sifflement qui monte en cri..." },
      { file: 'sound_44.mp3', answer: 'bebe', hint: "Ces gémissements doux et répétés..." },
      { file: 'sound_45.mp3', answer: 'chat', hint: "Ce miaou en chuchotement..." },
      { file: 'sound_46.mp3', answer: 'bebe', hint: "Ces sons d'excitation en staccato..." },
      { file: 'sound_47.mp3', answer: 'chat', hint: "Ces mew-mew-mew rapides en rafale..." },
      { file: 'sound_48.mp3', answer: 'bebe', hint: "Ce pleur long et soutenu..." },
      { file: 'sound_49.mp3', answer: 'chat', hint: "Ce miaou solitaire et mélancolique..." },
      { file: 'sound_50.mp3', answer: 'bebe', hint: "Ces pétarades labiales espiègle..." },
    ],
  },
  ronflementMoteur: {
    id: 'ronflement-moteur',
    title: 'Ronflement ou Moteur ?',
    subtitle: 'Mécanique ou humain ?',
    emoji: '😴🔧',
    optionA: { label: 'Ronflement', emoji: '😴', key: 'ronflement' as const },
    optionB: { label: 'Moteur', emoji: '🔧', key: 'moteur' as const },
    folder: 'ronflement-moteur',
    questions: [
      { file: 'sound_01.mp3', answer: 'ronflement', hint: "Ce ronronnement humain profond et régulier..." },
      { file: 'sound_02.mp3', answer: 'moteur', hint: "Ce grondement mécanique qui tourne en régime..." },
      { file: 'sound_03.mp3', answer: 'ronflement', hint: "Cette respiration saccadée et hoquetante..." },
      { file: 'sound_04.mp3', answer: 'moteur', hint: "Ce pétaradement rythmé qui se stabilise..." },
      { file: 'sound_05.mp3', answer: 'ronflement', hint: "Ce grondement grave qui fait vibrer le lit..." },
      { file: 'sound_06.mp3', answer: 'moteur', hint: "Ce ronronnement régulier sous le capot..." },
      { file: 'sound_07.mp3', answer: 'ronflement', hint: "Ces pauses et redémarrages irréguliers..." },
      { file: 'sound_08.mp3', answer: 'moteur', hint: "Ce démarrage laborieux avant de trouver son rythme..." },
      { file: 'sound_09.mp3', answer: 'ronflement', hint: "Ce sifflement nasal aigu et continu..." },
      { file: 'sound_10.mp3', answer: 'moteur', hint: "Ce bourdonnement stable et infatigable..." },
      { file: 'sound_11.mp3', answer: 'ronflement', hint: "Ce rugissement nocturne qui traverse les murs..." },
      { file: 'sound_12.mp3', answer: 'moteur', hint: "Ce démarrage progressif qui monte en puissance..." },
      { file: 'sound_13.mp3', answer: 'ronflement', hint: "Ce léger ronflement paisible comme une berceuse..." },
      { file: 'sound_14.mp3', answer: 'moteur', hint: "Ce grondement diesel profond et régulier..." },
      { file: 'sound_15.mp3', answer: 'ronflement', hint: "Ces renifle-ronfle avec petits soubresauts..." },
      { file: 'sound_16.mp3', answer: 'moteur', hint: "Ce clapotement lent et cadencé..." },
      { file: 'sound_17.mp3', answer: 'ronflement', hint: "Ce ronflement titanesque qui remplit la pièce..." },
      { file: 'sound_18.mp3', answer: 'moteur', hint: "Ce souffle mécanique régulier et puissant..." },
      { file: 'sound_19.mp3', answer: 'ronflement', hint: "Cette respiration rapide et superficielle..." },
      { file: 'sound_20.mp3', answer: 'moteur', hint: "Ce grondement avec ses à-coups rythmiques..." },
      { file: 'sound_21.mp3', answer: 'ronflement', hint: "Ces vagues de ronflement croissant et décroissant..." },
      { file: 'sound_22.mp3', answer: 'moteur', hint: "Ce pétaradement saccadé au ralenti..." },
      { file: 'sound_23.mp3', answer: 'ronflement', hint: "Ce ronflement sifflant comme de l'air dans un tuyau..." },
      { file: 'sound_24.mp3', answer: 'moteur', hint: "Ce moteur capricieux qui rate de temps en temps..." },
      { file: 'sound_25.mp3', answer: 'ronflement', hint: "Ce concert de ronflement monumental..." },
      { file: 'sound_26.mp3', answer: 'moteur', hint: "Ce poum-poum lent et puissant..." },
      { file: 'sound_27.mp3', answer: 'ronflement', hint: "Ces interruptions avec raclements de gorge..." },
      { file: 'sound_28.mp3', answer: 'moteur', hint: "Ce petit cliquetis léger et régulier..." },
      { file: 'sound_29.mp3', answer: 'ronflement', hint: "Ce vrombissement vibrant dans les os..." },
      { file: 'sound_30.mp3', answer: 'moteur', hint: "Ce ronronnement mécanique constant et rassurant..." },
      { file: 'sound_31.mp3', answer: 'ronflement', hint: "Cette respiration profonde façon générateur..." },
      { file: 'sound_32.mp3', answer: 'moteur', hint: "Ce pétillement léger et rapide..." },
      { file: 'sound_33.mp3', answer: 'ronflement', hint: "Ce ronflement humide aux harmoniques étranges..." },
      { file: 'sound_34.mp3', answer: 'moteur', hint: "Ce grondement massif de géant mécanique..." },
      { file: 'sound_35.mp3', answer: 'ronflement', hint: "Ce ronflement à son paroxysme absolu..." },
      { file: 'sound_36.mp3', answer: 'moteur', hint: "Ce bourdonnement précis et inlassable..." },
      { file: 'sound_37.mp3', answer: 'ronflement', hint: "Ce ronflement doux et régulier comme une horloge..." },
      { file: 'sound_38.mp3', answer: 'moteur', hint: "Ce sifflement nasillard continu..." },
      { file: 'sound_39.mp3', answer: 'ronflement', hint: "Ces vibrations gutturales comme des pièces qui s'entrechoquent..." },
      { file: 'sound_40.mp3', answer: 'moteur', hint: "Ce battement lent sur l'eau..." },
      { file: 'sound_41.mp3', answer: 'ronflement', hint: "Ce ronflement en mode haute-intensité..." },
      { file: 'sound_42.mp3', answer: 'moteur', hint: "Ce pompage régulier et monotone..." },
      { file: 'sound_43.mp3', answer: 'ronflement', hint: "Ce ronflement oscillant entre graves et aigus..." },
      { file: 'sound_44.mp3', answer: 'moteur', hint: "Ce tambourinement circulaire et régulier..." },
      { file: 'sound_45.mp3', answer: 'ronflement', hint: "Ces crescendos suivis de silences inquiétants..." },
      { file: 'sound_46.mp3', answer: 'moteur', hint: "Ce pétaradement vintage aux ratés charmants..." },
      { file: 'sound_47.mp3', answer: 'ronflement', hint: "Ce grommellement grave et sourd..." },
      { file: 'sound_48.mp3', answer: 'moteur', hint: "Ce souffle mécanique régulier de fond..." },
      { file: 'sound_49.mp3', answer: 'ronflement', hint: "Ce délire respiratoire syncopé..." },
      { file: 'sound_50.mp3', answer: 'moteur', hint: "Ce ronronnement aérien régulier..." },
    ],
  },
  sportCalin: {
    id: 'sport-calin',
    title: 'Sport ou Câlin ?',
    emoji: '🏋️💕',
    subtitle: 'Effort physique ou moment intime ?',
    optionA: { label: 'Sport', emoji: '🏋️', key: 'sport' as const },
    optionB: { label: 'Câlin', emoji: '💕', key: 'calin' as const },
    folder: 'sport-calin',
    questions: [
      { file: 'sound_01.mp3', answer: 'sport',  hint: "Ces grognements d'effort intense à la salle..." },
      { file: 'sound_02.mp3', answer: 'calin',  hint: "Ces soupirs de contentement..." },
      { file: 'sound_03.mp3', answer: 'sport',  hint: "Ces grognements de tennisman à chaque coup..." },
      { file: 'sound_04.mp3', answer: 'calin',  hint: "Cette respiration qui s'accélère..." },
      { file: 'sound_05.mp3', answer: 'sport',  hint: "Ces halètements de CrossFit..." },
      { file: 'sound_06.mp3', answer: 'calin',  hint: "Ces murmures tendres..." },
      { file: 'sound_07.mp3', answer: 'sport',  hint: "Cette respiration cardio haletante..." },
      { file: 'sound_08.mp3', answer: 'calin',  hint: "Ce grincement rythmique..." },
      { file: 'sound_09.mp3', answer: 'sport',  hint: "Ces expirations de boxeur..." },
      { file: 'sound_10.mp3', answer: 'calin',  hint: "Ces gémissements de satisfaction profonde..." },
      { file: 'sound_11.mp3', answer: 'sport',  hint: "Ces grognements de pompes..." },
      { file: 'sound_12.mp3', answer: 'calin',  hint: "Cette respiration qui s'emballe..." },
      { file: 'sound_13.mp3', answer: 'sport',  hint: "Cette respiration yoga ujjayi..." },
      { file: 'sound_14.mp3', answer: 'calin',  hint: "Ces chuchotements tendres..." },
      { file: 'sound_15.mp3', answer: 'sport',  hint: "Ces grognements de rameur..." },
      { file: 'sound_16.mp3', answer: 'calin',  hint: "Ce matelas qui parle..." },
      { file: 'sound_17.mp3', answer: 'sport',  hint: "Ce sprint à bout de souffle..." },
      { file: 'sound_18.mp3', answer: 'calin',  hint: "Ces gémissements de contentement profond..." },
      { file: 'sound_19.mp3', answer: 'sport',  hint: "Ces respirations contrôlées de pilates..." },
      { file: 'sound_20.mp3', answer: 'calin',  hint: "Ces petits halètements de bonheur..." },
      { file: 'sound_21.mp3', answer: 'sport',  hint: "Ce cri d'haltérophile olympique..." },
      { file: 'sound_22.mp3', answer: 'calin',  hint: "Ces vocalises rythmiques croissantes..." },
      { file: 'sound_23.mp3', answer: 'sport',  hint: "Ce sprint cycliste à plein régime..." },
      { file: 'sound_24.mp3', answer: 'calin',  hint: "Ces murmures de plaisir doux..." },
      { file: 'sound_25.mp3', answer: 'sport',  hint: "Cet épuisement total après HIIT..." },
      { file: 'sound_26.mp3', answer: 'calin',  hint: "Ces soupirs intimes doux..." },
      { file: 'sound_27.mp3', answer: 'sport',  hint: "Ce virage de nage haletant..." },
      { file: 'sound_28.mp3', answer: 'calin',  hint: "Ces gémissements tendres mêlés..." },
      { file: 'sound_29.mp3', answer: 'sport',  hint: "Ces expirations de gymnaste..." },
      { file: 'sound_30.mp3', answer: 'calin',  hint: "Cette respiration rythmée apaisante..." },
      { file: 'sound_31.mp3', answer: 'sport',  hint: "Ce cours de spinning en collectif..." },
      { file: 'sound_32.mp3', answer: 'calin',  hint: "Ces petits cris de surprise ravie..." },
      { file: 'sound_33.mp3', answer: 'sport',  hint: "Ce kiai de karatéka..." },
      { file: 'sound_34.mp3', answer: 'calin',  hint: "Ce long soupir d'accomplissement..." },
      { file: 'sound_35.mp3', answer: 'sport',  hint: "Cette montée d'escaliers à bout de souffle..." },
      { file: 'sound_36.mp3', answer: 'calin',  hint: "Ces gémissements tendres et lents..." },
      { file: 'sound_37.mp3', answer: 'sport',  hint: "Ce circuit burpees intensif..." },
      { file: 'sound_38.mp3', answer: 'calin',  hint: "Ces vocalises qui montent en puissance..." },
      { file: 'sound_39.mp3', answer: 'sport',  hint: "Ces coups sur le sac de frappe..." },
      { file: 'sound_40.mp3', answer: 'calin',  hint: "Ces gémissements comblés et lents..." },
      { file: 'sound_41.mp3', answer: 'sport',  hint: "Cette arrivée de course épuisante..." },
      { file: 'sound_42.mp3', answer: 'calin',  hint: "Ces chuchotements amoureux..." },
      { file: 'sound_43.mp3', answer: 'sport',  hint: "Ce soulevé de terre à la limite absolue..." },
      { file: 'sound_44.mp3', answer: 'calin',  hint: "Ces rires et soupirs entremêlés..." },
      { file: 'sound_45.mp3', answer: 'sport',  hint: "Ce fractionné sport-récup..." },
      { file: 'sound_46.mp3', answer: 'calin',  hint: "Cette respiration qui s'intensifie..." },
      { file: 'sound_47.mp3', answer: 'sport',  hint: "Cette corde à sauter rythmée..." },
      { file: 'sound_48.mp3', answer: 'calin',  hint: "Ces sons intimes à peine audibles..." },
      { file: 'sound_49.mp3', answer: 'sport',  hint: "Ce sprint de compétition désespéré..." },
      { file: 'sound_50.mp3', answer: 'calin',  hint: "Ce dernier soupir de plénitude totale..." },
    ],
  },
  massageGalipette: {
    id: 'massage-galipette',
    title: 'Massage ou Galipette ?',
    emoji: '💆🙈',
    subtitle: 'Thérapie ou frivolité ?',
    optionA: { label: 'Massage', emoji: '💆', key: 'massage' as const },
    optionB: { label: 'Galipette', emoji: '🙈', key: 'galipette' as const },
    folder: 'massage-galipette',
    questions: [
      { file: 'sound_01.mp3', answer: 'massage',   hint: "Ce long gémissement de libération musculaire..." },
      { file: 'sound_02.mp3', answer: 'galipette', hint: "Ces sons rythmiques légers et joueurs..." },
      { file: 'sound_03.mp3', answer: 'massage',   hint: "Ce grognement de massage des tissus profonds..." },
      { file: 'sound_04.mp3', answer: 'galipette', hint: "Cette respiration intime douce et lente..." },
      { file: 'sound_05.mp3', answer: 'massage',   hint: "Ce soupir de pierres chaudes posées sur le dos..." },
      { file: 'sound_06.mp3', answer: 'galipette', hint: "Ces rires doux qui virent aux soupirs..." },
      { file: 'sound_07.mp3', answer: 'massage',   hint: "Ce grognement de massage des ischio-jambiers..." },
      { file: 'sound_08.mp3', answer: 'galipette', hint: "Ces vocalises rythmiques répétées..." },
      { file: 'sound_09.mp3', answer: 'massage',   hint: "Ce long relâchement en massage suédois..." },
      { file: 'sound_10.mp3', answer: 'galipette', hint: "Ces halètements intimes mêlés de soupirs..." },
      { file: 'sound_11.mp3', answer: 'massage',   hint: "Ces cris de réflexologie plantaire..." },
      { file: 'sound_12.mp3', answer: 'galipette', hint: "Ces sons urgents et intimes..." },
      { file: 'sound_13.mp3', answer: 'massage',   hint: "Ce grognement d'étirement en massage thaï..." },
      { file: 'sound_14.mp3', answer: 'galipette', hint: "Ces murmures doux de complicité..." },
      { file: 'sound_15.mp3', answer: 'massage',   hint: "Ce soulagement d'un nœud libéré..." },
      { file: 'sound_16.mp3', answer: 'galipette', hint: "Ces sons intimes qui s'amplifient doucement..." },
      { file: 'sound_17.mp3', answer: 'massage',   hint: "Ces mmmmm de spa de luxe..." },
      { file: 'sound_18.mp3', answer: 'galipette', hint: "Ces petits cris surpris et ravis..." },
      { file: 'sound_19.mp3', answer: 'massage',   hint: "Ce gémissement de massage sportif..." },
      { file: 'sound_20.mp3', answer: 'galipette', hint: "Ces vocalises de plaisir qui montent..." },
      { file: 'sound_21.mp3', answer: 'massage',   hint: "Ce relâchement crânio-sacré profond..." },
      { file: 'sound_22.mp3', answer: 'galipette', hint: "Ces sons légers et joueurs et tendres..." },
      { file: 'sound_23.mp3', answer: 'massage',   hint: "Ce cri-soulagement d'un trigger point..." },
      { file: 'sound_24.mp3', answer: 'galipette', hint: "Ces gémissements profonds d'intimité..." },
      { file: 'sound_25.mp3', answer: 'massage',   hint: "Cet exhale de massage corps entier à l'huile..." },
      { file: 'sound_26.mp3', answer: 'galipette', hint: "Ces vocalises intimes qui s'amplifient..." },
      { file: 'sound_27.mp3', answer: 'massage',   hint: "Ce soupir d'aromathérapie..." },
      { file: 'sound_28.mp3', answer: 'galipette', hint: "Ces sons de tendresse rythmés..." },
      { file: 'sound_29.mp3', answer: 'massage',   hint: "Ces grognements de shiatsu..." },
      { file: 'sound_30.mp3', answer: 'galipette', hint: "Ces vocalises de rapprochement répétées..." },
      { file: 'sound_31.mp3', answer: 'massage',   hint: "Ces gémissements de massage du cuir chevelu..." },
      { file: 'sound_32.mp3', answer: 'galipette', hint: "Ces rires qui virent en soupirs tendres..." },
      { file: 'sound_33.mp3', answer: 'massage',   hint: "Ces cris de massage au bambou..." },
      { file: 'sound_34.mp3', answer: 'galipette', hint: "Ces sons intimes qui montent en puissance..." },
      { file: 'sound_35.mp3', answer: 'massage',   hint: "Ce choc froid puis long gémissement de glace..." },
      { file: 'sound_36.mp3', answer: 'galipette', hint: "Ces sons tendres et affectueux..." },
      { file: 'sound_37.mp3', answer: 'massage',   hint: "Ce cri de ventouses en massage..." },
      { file: 'sound_38.mp3', answer: 'galipette', hint: "Ces soupirs intimes sans voix..." },
      { file: 'sound_39.mp3', answer: 'massage',   hint: "Ce long relâchement en lomi lomi..." },
      { file: 'sound_40.mp3', answer: 'galipette', hint: "Ces sons chauds de complicité partagée..." },
      { file: 'sound_41.mp3', answer: 'massage',   hint: "Ce 'ahhhh' de fascia qui lâche enfin..." },
      { file: 'sound_42.mp3', answer: 'galipette', hint: "Ces sons intimes à leur paroxysme..." },
      { file: 'sound_43.mp3', answer: 'massage',   hint: "Ce cri douloureux-plaisant de bandelette IT..." },
      { file: 'sound_44.mp3', answer: 'galipette', hint: "Ces soupirs qui s'apaisent doucement..." },
      { file: 'sound_45.mp3', answer: 'massage',   hint: "Ce soulagement en massage prénatal..." },
      { file: 'sound_46.mp3', answer: 'galipette', hint: "Ces sons intimes lents et profonds..." },
      { file: 'sound_47.mp3', answer: 'massage',   hint: "Ce cri du massage cervical au bureau..." },
      { file: 'sound_48.mp3', answer: 'galipette', hint: "Ces murmures à peine audibles d'intimité..." },
      { file: 'sound_49.mp3', answer: 'massage',   hint: "Ce dernier gémissement de fin de séance..." },
      { file: 'sound_50.mp3', answer: 'galipette', hint: "Ce long soupir final d'épanouissement..." },
    ],
  },
  dentisteAmants: {
    id: 'dentiste-amants',
    title: 'Dentiste ou Amants ?',
    emoji: '🦷😏',
    subtitle: 'Cabinet dentaire ou cabinet secret ?',
    optionA: { label: 'Dentiste', emoji: '🦷', key: 'dentiste' as const },
    optionB: { label: 'Amants', emoji: '😏', key: 'amants' as const },
    folder: 'dentiste-amants',
    questions: [
      { file: 'sound_01.mp3', answer: 'dentiste', hint: "Cette fraise qui tourne et ce gémissement muffled..." },
      { file: 'sound_02.mp3', answer: 'amants',   hint: "Ces soupirs intimes et doux..." },
      { file: 'sound_03.mp3', answer: 'dentiste', hint: "'Ouvrez plus grand !' + les plaintes du patient..." },
      { file: 'sound_04.mp3', answer: 'amants',   hint: "Cette respiration qui s'emballe..." },
      { file: 'sound_05.mp3', answer: 'dentiste', hint: "Ce gémissement quand la seringue entre dans la gencive..." },
      { file: 'sound_06.mp3', answer: 'amants',   hint: "Ces gémissements profonds d'affection..." },
      { file: 'sound_07.mp3', answer: 'dentiste', hint: "L'aspiration + le soupir du patient..." },
      { file: 'sound_08.mp3', answer: 'amants',   hint: "Ces souffles passionnés qui s'accélèrent..." },
      { file: 'sound_09.mp3', answer: 'dentiste', hint: "Ce patient qui essaie de parler bouche engourdie..." },
      { file: 'sound_10.mp3', answer: 'amants',   hint: "Ces murmures tendres à deux..." },
      { file: 'sound_11.mp3', answer: 'dentiste', hint: "Ce nerf touché — l'inspiration brusque puis le gémissement..." },
      { file: 'sound_12.mp3', answer: 'amants',   hint: "Ces halètements intimes qui montent..." },
      { file: 'sound_13.mp3', answer: 'dentiste', hint: "La polisseuse qui vibre + le patient qui vibre aussi..." },
      { file: 'sound_14.mp3', answer: 'amants',   hint: "Ces soupirs de satisfaction lente..." },
      { file: 'sound_15.mp3', answer: 'dentiste', hint: "L'anxiété avant la fraise..." },
      { file: 'sound_16.mp3', answer: 'amants',   hint: "Ces chuchotements amoureux..." },
      { file: 'sound_17.mp3', answer: 'dentiste', hint: "L'extraction + le long gémissement de soulagement..." },
      { file: 'sound_18.mp3', answer: 'amants',   hint: "Ces vocalises intimes au paroxysme..." },
      { file: 'sound_19.mp3', answer: 'dentiste', hint: "Parler la bouche pleine d'instruments..." },
      { file: 'sound_20.mp3', answer: 'amants',   hint: "Ces rires qui virent en soupirs..." },
      { file: 'sound_21.mp3', answer: 'dentiste', hint: "Le détartreur ultrasonique + la grimace sonore..." },
      { file: 'sound_22.mp3', answer: 'amants',   hint: "Ces gémissements profonds partagés..." },
      { file: 'sound_23.mp3', answer: 'dentiste', hint: "Le gargarisme dramatique dans le crachoir..." },
      { file: 'sound_24.mp3', answer: 'amants',   hint: "Ces murmures de complicité..." },
      { file: 'sound_25.mp3', answer: 'dentiste', hint: "L'abcès pressé — cri puis soulagement..." },
      { file: 'sound_26.mp3', answer: 'amants',   hint: "Ce dernier soupir d'épanouissement..." },
      { file: 'sound_27.mp3', answer: 'dentiste', hint: "Le traitement de canal — long et douloureux..." },
      { file: 'sound_28.mp3', answer: 'amants',   hint: "Cette respiration rythmée douce..." },
      { file: 'sound_29.mp3', answer: 'dentiste', hint: "L'empreinte dentaire + le réflexe nauséeux..." },
      { file: 'sound_30.mp3', answer: 'amants',   hint: "Ces murmures chaleureux intimes..." },
      { file: 'sound_31.mp3', answer: 'dentiste', hint: "'C'est fini !' + le soupir de survie..." },
      { file: 'sound_32.mp3', answer: 'amants',   hint: "Ces vocalises croissantes et urgentes..." },
      { file: 'sound_33.mp3', answer: 'dentiste', hint: "La radio dentaire dans la bouche — muffled..." },
      { file: 'sound_34.mp3', answer: 'amants',   hint: "Ces sons chauds et aimants..." },
      { file: 'sound_35.mp3', answer: 'dentiste', hint: "L'enfant terrorisé avant la fraise..." },
      { file: 'sound_36.mp3', answer: 'amants',   hint: "Ces sons à peine audibles de tendresse..." },
      { file: 'sound_37.mp3', answer: 'dentiste', hint: "Les points de suture dans la gencive..." },
      { file: 'sound_38.mp3', answer: 'amants',   hint: "Ces sons doux partagés..." },
      { file: 'sound_39.mp3', answer: 'dentiste', hint: "La dent de sagesse arrachée — le craquement + le moan..." },
      { file: 'sound_40.mp3', answer: 'amants',   hint: "Ces souffles intimes rythmés ensemble..." },
      { file: 'sound_41.mp3', answer: 'dentiste', hint: "La couronne provisoire mise en place..." },
      { file: 'sound_42.mp3', answer: 'amants',   hint: "Ces vocalises partagées de plaisir..." },
      { file: 'sound_43.mp3', answer: 'dentiste', hint: "Les écarteurs buccaux + la plainte étirée..." },
      { file: 'sound_44.mp3', answer: 'amants',   hint: "Ces soupirs post-tendresse comblés..." },
      { file: 'sound_45.mp3', answer: 'dentiste', hint: "Le plateau de fluor gardé 2 minutes — l'impatience..." },
      { file: 'sound_46.mp3', answer: 'amants',   hint: "Ces sons d'amour lents et doux..." },
      { file: 'sound_47.mp3', answer: 'dentiste', hint: "La gouttière de bruxisme + le réflexe de déglutition..." },
      { file: 'sound_48.mp3', answer: 'amants',   hint: "Ces désirs chuchotés..." },
      { file: 'sound_49.mp3', answer: 'dentiste', hint: "'C'est terminé' — le long exhale de survie..." },
      { file: 'sound_50.mp3', answer: 'amants',   hint: "Ces derniers soupirs tendres qui s'effacent..." },
    ],
  },
  horreurChambre: {
    id: 'horreur-chambre',
    title: "Film d'horreur ou Chambre ?",
    emoji: '😱🛏️',
    subtitle: 'Terreur ou plaisir ?',
    optionA: { label: "Film d'horreur", emoji: '😱', key: 'horreur' as const },
    optionB: { label: 'Chambre', emoji: '🛏️', key: 'chambre' as const },
    folder: 'horreur-chambre',
    questions: [
      { file: 'sound_01.mp3', answer: 'horreur', hint: "Ces gémissements apeurés dans le noir..." },
      { file: 'sound_02.mp3', answer: 'chambre', hint: "Ces soupirs tendres intimes..." },
      { file: 'sound_03.mp3', answer: 'horreur', hint: "Ce halètement de terreur pure..." },
      { file: 'sound_04.mp3', answer: 'chambre', hint: "Ces vocalises de plaisir qui montent..." },
      { file: 'sound_05.mp3', answer: 'horreur', hint: "Cette respiration paniquée cachée..." },
      { file: 'sound_06.mp3', answer: 'chambre', hint: "Ces souffles passionnés ensemble..." },
      { file: 'sound_07.mp3', answer: 'horreur', hint: "Ces 'non non non' terrifiés..." },
      { file: 'sound_08.mp3', answer: 'chambre', hint: "Cette intensité croissante intime..." },
      { file: 'sound_09.mp3', answer: 'horreur', hint: "L'hyperventilation de terreur absolue..." },
      { file: 'sound_10.mp3', answer: 'chambre', hint: "Ces soupirs doux partagés..." },
      { file: 'sound_11.mp3', answer: 'horreur', hint: "Ce gémissement de désespoir prolongé..." },
      { file: 'sound_12.mp3', answer: 'chambre', hint: "Ces halètements passionnés urgents..." },
      { file: 'sound_13.mp3', answer: 'horreur', hint: "Ces petits couinements de terreur cachée..." },
      { file: 'sound_14.mp3', answer: 'chambre', hint: "Ces gémissements profonds de contentement..." },
      { file: 'sound_15.mp3', answer: 'horreur', hint: "Ce gémissement post-traumatique..." },
      { file: 'sound_16.mp3', answer: 'chambre', hint: "Ces vocalises rythmiques intimes..." },
      { file: 'sound_17.mp3', answer: 'horreur', hint: "'Allô? Il y a quelqu'un?' tremblant..." },
      { file: 'sound_18.mp3', answer: 'chambre', hint: "Ces sons au paroxysme intime..." },
      { file: 'sound_19.mp3', answer: 'horreur', hint: "Le tremblement contre le mur..." },
      { file: 'sound_20.mp3', answer: 'chambre', hint: "Ces soupirs comblés et doux..." },
      { file: 'sound_21.mp3', answer: 'horreur', hint: "Ces gémissements fantomatiques derrière la porte..." },
      { file: 'sound_22.mp3', answer: 'chambre', hint: "Ces vocalises de satisfaction mutuelle..." },
      { file: 'sound_23.mp3', answer: 'horreur', hint: "Le cri étouffé dans la main..." },
      { file: 'sound_24.mp3', answer: 'chambre', hint: "Ces soupirs post-intimité apaisés..." },
      { file: 'sound_25.mp3', answer: 'horreur', hint: "'Au secours...' chuchoté dans la panique..." },
      { file: 'sound_26.mp3', answer: 'chambre', hint: "Ces sons doux et passionnés..." },
      { file: 'sound_27.mp3', answer: 'horreur', hint: "L'imploration désespérée dans un coin..." },
      { file: 'sound_28.mp3', answer: 'chambre', hint: "Ces gémissements doux rythmés..." },
      { file: 'sound_29.mp3', answer: 'horreur', hint: "La maison hantée — le craquement puis le halètement..." },
      { file: 'sound_30.mp3', answer: 'chambre', hint: "Ces sons chaleureux croissants ensemble..." },
      { file: 'sound_31.mp3', answer: 'horreur', hint: "Le zombie qui emporte la victime — ses derniers sons..." },
      { file: 'sound_32.mp3', answer: 'chambre', hint: "Ces vocalises de plaisir partagé..." },
      { file: 'sound_33.mp3', answer: 'horreur', hint: "Le cri qui se transforme en moan épuisé..." },
      { file: 'sound_34.mp3', answer: 'chambre', hint: "Ces murmures amoureux tendres..." },
      { file: 'sound_35.mp3', answer: 'horreur', hint: "La victime ligotée — muffled et effrayée..." },
      { file: 'sound_36.mp3', answer: 'chambre', hint: "Ces gémissements lents et tendres..." },
      { file: 'sound_37.mp3', answer: 'horreur', hint: "La possession — guttural et effrayant..." },
      { file: 'sound_38.mp3', answer: 'chambre', hint: "Ces sons intimes qui culminent..." },
      { file: 'sound_39.mp3', answer: 'horreur', hint: "La final girl épuisée après l'ordeal..." },
      { file: 'sound_40.mp3', answer: 'chambre', hint: "Ces murmures post-intimité comblés..." },
      { file: 'sound_41.mp3', answer: 'horreur', hint: "L'ami impossible à réveiller — la terreur..." },
      { file: 'sound_42.mp3', answer: 'chambre', hint: "Ces sons de désir et chaleur..." },
      { file: 'sound_43.mp3', answer: 'horreur', hint: "Le personnage qui réalise qu'il est piégé..." },
      { file: 'sound_44.mp3', answer: 'chambre', hint: "Ces soupirs d'après tendresse..." },
      { file: 'sound_45.mp3', answer: 'horreur', hint: "'Qui est là ?' dans l'obscurité tremblante..." },
      { file: 'sound_46.mp3', answer: 'chambre', hint: "Ces vocalises libérées ensemble..." },
      { file: 'sound_47.mp3', answer: 'horreur', hint: "Le contact surnaturel — le frisson moan..." },
      { file: 'sound_48.mp3', answer: 'chambre', hint: "Ces sons à peine audibles de plénitude..." },
      { file: 'sound_49.mp3', answer: 'horreur', hint: "Le dernier cri + le silence + le gémissement..." },
      { file: 'sound_50.mp3', answer: 'chambre', hint: "Ce long soupir final de satisfaction absolue..." },
    ],
  },
  accouchementExtase: {
    id: 'accouchement-extase',
    title: 'Accouchement ou Extase ?',
    emoji: '🤰🔥',
    subtitle: 'Douleur ou plaisir ? La même chose ?',
    optionA: { label: 'Accouchement', emoji: '🤰', key: 'accouchement' as const },
    optionB: { label: 'Extase', emoji: '🔥', key: 'extase' as const },
    folder: 'accouchement-extase',
    questions: [
      { file: 'sound_01.mp3', answer: 'accouchement', hint: "Cette contraction soudaine qui coupe le souffle..." },
      { file: 'sound_02.mp3', answer: 'extase',        hint: "Ces vocalises d'extase qui montent..." },
      { file: 'sound_03.mp3', answer: 'accouchement', hint: "La respiration hee-hoo entre les contractions..." },
      { file: 'sound_04.mp3', answer: 'extase',        hint: "Cette respiration urgente et passionnée..." },
      { file: 'sound_05.mp3', answer: 'accouchement', hint: "'Je n'en peux plus !' entre deux contractions..." },
      { file: 'sound_06.mp3', answer: 'extase',        hint: "Ces gémissements profonds d'extase..." },
      { file: 'sound_07.mp3', answer: 'accouchement', hint: "'Poussez encore !' — l'effort ultime..." },
      { file: 'sound_08.mp3', answer: 'extase',        hint: "Ces halètements passionnés au paroxysme..." },
      { file: 'sound_09.mp3', answer: 'accouchement', hint: "La première contraction surprise..." },
      { file: 'sound_10.mp3', answer: 'extase',        hint: "Ces soupirs tendres qui s'amplifient..." },
      { file: 'sound_11.mp3', answer: 'accouchement', hint: "Ce balancement rythmique entre contractions..." },
      { file: 'sound_12.mp3', answer: 'extase',        hint: "Ces vocalises rythmiques d'extase..." },
      { file: 'sound_13.mp3', answer: 'accouchement', hint: "'Je veux une péridurale !' — le cri du cœur..." },
      { file: 'sound_14.mp3', answer: 'extase',        hint: "Ces sons intenses au sommet du plaisir..." },
      { file: 'sound_15.mp3', answer: 'accouchement', hint: "S'accrocher au lit en contractant..." },
      { file: 'sound_16.mp3', answer: 'extase',        hint: "Ces vagues de plaisir vocalisées..." },
      { file: 'sound_17.mp3', answer: 'accouchement', hint: "L'accouchement dans l'eau — le soupir de chaleur..." },
      { file: 'sound_18.mp3', answer: 'extase',        hint: "Ces sons urgents et passionnés ensemble..." },
      { file: 'sound_19.mp3', answer: 'accouchement', hint: "Compter 1-2-3-4 puis pousser de toutes ses forces..." },
      { file: 'sound_20.mp3', answer: 'extase',        hint: "Ce soupir comblé après l'extase..." },
      { file: 'sound_21.mp3', answer: 'accouchement', hint: "La contraction qui monte et redescend comme une vague..." },
      { file: 'sound_22.mp3', answer: 'extase',        hint: "Ces vocalises urgentes et intenses..." },
      { file: 'sound_23.mp3', answer: 'accouchement', hint: "Entre deux vagues, épuisée et haletante..." },
      { file: 'sound_24.mp3', answer: 'extase',        hint: "Ces sons essoufflés d'extase absolue..." },
      { file: 'sound_25.mp3', answer: 'accouchement', hint: "La poussée finale — le cri le plus grand de sa vie..." },
      { file: 'sound_26.mp3', answer: 'extase',        hint: "Ce dernier souffle d'extase comblée..." },
      { file: 'sound_27.mp3', answer: 'accouchement', hint: "La péridurale qui s'efface — choc de la douleur retour..." },
      { file: 'sound_28.mp3', answer: 'extase',        hint: "Ces vocalises de plaisir rythmées en vagues..." },
      { file: 'sound_29.mp3', answer: 'accouchement', hint: "Accouchement naturel à la maison, vocalisations profondes..." },
      { file: 'sound_30.mp3', answer: 'extase',        hint: "Ces sons de plaisir mutuel au sommet..." },
      { file: 'sound_31.mp3', answer: 'accouchement', hint: "La phase anneau de feu — l'effort concentré..." },
      { file: 'sound_32.mp3', answer: 'extase',        hint: "Cette montée lente vers l'extase..." },
      { file: 'sound_33.mp3', answer: 'accouchement', hint: "'Aide moi !' entre les vagues de douleur..." },
      { file: 'sound_34.mp3', answer: 'extase',        hint: "Ces vocalises passionnées au paroxysme..." },
      { file: 'sound_35.mp3', answer: 'accouchement', hint: "Le dos en feu — travail postérieur douloureux..." },
      { file: 'sound_36.mp3', answer: 'extase',        hint: "Ces sons d'extase qui se libèrent..." },
      { file: 'sound_37.mp3', answer: 'accouchement', hint: "La naissance hypnobirthée — vocalisations zen..." },
      { file: 'sound_38.mp3', answer: 'extase',        hint: "Ces vagues de plaisir vocales rythmiques..." },
      { file: 'sound_39.mp3', answer: 'accouchement', hint: "Pousser avec la sage-femme — effort collectif..." },
      { file: 'sound_40.mp3', answer: 'extase',        hint: "Ce soupir de contentement total après l'extase..." },
      { file: 'sound_41.mp3', answer: 'accouchement', hint: "La contraction surprise en pleine rue..." },
      { file: 'sound_42.mp3', answer: 'extase',        hint: "Ces vocalises urgentes et passionnées..." },
      { file: 'sound_43.mp3', answer: 'accouchement', hint: "Plusieurs poussées de suite — l'endurance..." },
      { file: 'sound_44.mp3', answer: 'extase',        hint: "Ces sons d'extase qui s'apaisent doucement..." },
      { file: 'sound_45.mp3', answer: 'accouchement', hint: "Ce cri involontaire qui sort tout seul..." },
      { file: 'sound_46.mp3', answer: 'extase',        hint: "Cette extase partagée au plus fort du plaisir..." },
      { file: 'sound_47.mp3', answer: 'accouchement', hint: "Contractions dos à dos sans répit — l'enfer..." },
      { file: 'sound_48.mp3', answer: 'extase',        hint: "Ces soupirs tendres d'une extase profonde..." },
      { file: 'sound_49.mp3', answer: 'accouchement', hint: "Le cri ultime de la vie qui arrive..." },
      { file: 'sound_50.mp3', answer: 'extase',        hint: "Ce long soupir final de plénitude absolue..." },
    ],
  },
  hammamChambre: {
    id: 'hammam-chambre',
    title: 'Hammam ou Chambre ?',
    emoji: '🧖🛏️',
    subtitle: 'Chaleur thérapeutique ou chaleur humaine ?',
    optionA: { label: 'Hammam', emoji: '🧖', key: 'hammam' as const },
    optionB: { label: 'Chambre', emoji: '🛏️', key: 'chambre2' as const },
    folder: 'hammam-chambre',
    questions: [
      { file: 'sound_01.mp3', answer: 'hammam',  hint: "Ce soupir quand la chaleur du hammam vous enveloppe..." },
      { file: 'sound_02.mp3', answer: 'chambre2', hint: "Ces soupirs intimes et doux de chambre..." },
      { file: 'sound_03.mp3', answer: 'hammam',  hint: "La kessa exfoliante — chaque passage arrache un gémissement..." },
      { file: 'sound_04.mp3', answer: 'chambre2', hint: "Cette respiration qui s'emballe dans la chambre..." },
      { file: 'sound_05.mp3', answer: 'hammam',  hint: "L'eau sur les pierres chaudes — la vapeur et le moan..." },
      { file: 'sound_06.mp3', answer: 'chambre2', hint: "Ces gémissements profonds de chambre..." },
      { file: 'sound_07.mp3', answer: 'hammam',  hint: "Le gant de crin sur le dos — la douleur plaisante..." },
      { file: 'sound_08.mp3', answer: 'chambre2', hint: "Ces halètements passionnés dans la chambre..." },
      { file: 'sound_09.mp3', answer: 'hammam',  hint: "La chaleur extrême — respiration laborieuse..." },
      { file: 'sound_10.mp3', answer: 'chambre2', hint: "Ces soupirs tendres de chambre à coucher..." },
      { file: 'sound_11.mp3', answer: 'hammam',  hint: "Le seau d'eau froide après la vapeur — le choc..." },
      { file: 'sound_12.mp3', answer: 'chambre2', hint: "Ces vocalises intenses de chambre..." },
      { file: 'sound_13.mp3', answer: 'hammam',  hint: "Le venik de bouleau russe — les claques et les moans..." },
      { file: 'sound_14.mp3', answer: 'chambre2', hint: "Ces soupirs tendres de contentement intime..." },
      { file: 'sound_15.mp3', answer: 'hammam',  hint: "La transpiration intense — souffle lourd et humide..." },
      { file: 'sound_16.mp3', answer: 'chambre2', hint: "Ces vocalises rythmiques de chambre..." },
      { file: 'sound_17.mp3', answer: 'hammam',  hint: "Le savon noir marocain en gommage — chaque frottis..." },
      { file: 'sound_18.mp3', answer: 'chambre2', hint: "Ces sons profonds de chambre partagée..." },
      { file: 'sound_19.mp3', answer: 'hammam',  hint: "Le sauna à 100°C — les limites du corps..." },
      { file: 'sound_20.mp3', answer: 'chambre2', hint: "Ces vocalises qui culminent dans la chambre..." },
      { file: 'sound_21.mp3', answer: 'hammam',  hint: "Le masque au ghassoul — le mmm de relaxation..." },
      { file: 'sound_22.mp3', answer: 'chambre2', hint: "Ces soupirs satisfaits de chambre douce..." },
      { file: 'sound_23.mp3', answer: 'hammam',  hint: "Le plongeon dans l'eau froide après le hammam..." },
      { file: 'sound_24.mp3', answer: 'chambre2', hint: "Ces murmures post-intimité comblés..." },
      { file: 'sound_25.mp3', answer: 'hammam',  hint: "L'huile d'argan après le gommage — le luxe sonore..." },
      { file: 'sound_26.mp3', answer: 'chambre2', hint: "Ces vocalises urgentes de chambre..." },
      { file: 'sound_27.mp3', answer: 'hammam',  hint: "La dalle de marbre chaude sous le corps..." },
      { file: 'sound_28.mp3', answer: 'chambre2', hint: "Ces gémissements tendres de chambre..." },
      { file: 'sound_29.mp3', answer: 'hammam',  hint: "Le löyly finlandais — la vague de chaleur intense..." },
      { file: 'sound_30.mp3', answer: 'chambre2', hint: "Ces sons passionnés au sommet de la chambre..." },
      { file: 'sound_31.mp3', answer: 'hammam',  hint: "L'étirement complet — les articulations qui craquent..." },
      { file: 'sound_32.mp3', answer: 'chambre2', hint: "Ces soupirs doux de chambre chaude..." },
      { file: 'sound_33.mp3', answer: 'hammam',  hint: "La chaleur excessive — étourdissement et moan..." },
      { file: 'sound_34.mp3', answer: 'chambre2', hint: "Ces vocalises rythmiques libérées de chambre..." },
      { file: 'sound_35.mp3', answer: 'hammam',  hint: "L'eau de rose versée sur le corps — le soupir de luxe..." },
      { file: 'sound_36.mp3', answer: 'chambre2', hint: "Ces sons intimes chaleureux de chambre..." },
      { file: 'sound_37.mp3', answer: 'hammam',  hint: "Le massage de dos au pied — le poids et le gémissement..." },
      { file: 'sound_38.mp3', answer: 'chambre2', hint: "Ces vocalises qui culminent passionnément..." },
      { file: 'sound_39.mp3', answer: 'hammam',  hint: "La session hammam en duo — soupirs mêlés..." },
      { file: 'sound_40.mp3', answer: 'chambre2', hint: "Ces soupirs d'après chambre comblés..." },
      { file: 'sound_41.mp3', answer: 'hammam',  hint: "Le thé à la menthe brûlant — le plaisir douloureux..." },
      { file: 'sound_42.mp3', answer: 'chambre2', hint: "Ces gémissements profonds et tendres de chambre..." },
      { file: 'sound_43.mp3', answer: 'hammam',  hint: "Le malaise de chaleur — évanouissement et récupération..." },
      { file: 'sound_44.mp3', answer: 'chambre2', hint: "Ces sons d'après chambre qui s'apaisent..." },
      { file: 'sound_45.mp3', answer: 'hammam',  hint: "Le rinçage final à l'eau chaude — la libération..." },
      { file: 'sound_46.mp3', answer: 'chambre2', hint: "Ces vocalises urgentes et partagées de chambre..." },
      { file: 'sound_47.mp3', answer: 'hammam',  hint: "Enveloppé dans un peignoir chaud après le hammam..." },
      { file: 'sound_48.mp3', answer: 'chambre2', hint: "Ces soupirs à peine audibles de chambre douce..." },
      { file: 'sound_49.mp3', answer: 'hammam',  hint: "La dernière session — corps limp sur la dalle..." },
      { file: 'sound_50.mp3', answer: 'chambre2', hint: "Ce long soupir final de chambre comblée..." },
    ],
  },
  plombierCalin: {
    id: 'plombier-calin',
    title: 'Plombier ou Câlin ?',
    emoji: '🔧💕',
    subtitle: 'Travaux ou tendresse ?',
    optionA: { label: 'Plombier', emoji: '🔧', key: 'plombier' as const },
    optionB: { label: 'Câlin', emoji: '💕', key: 'calinp' as const },
    folder: 'plombier-calin',
    questions: [
      { file: 'sound_01.mp3', answer: 'plombier', hint: "Ces grognements sous l'évier..." },
      { file: 'sound_02.mp3', answer: 'calinp',   hint: "Ces soupirs tendres intimes..." },
      { file: 'sound_03.mp3', answer: 'plombier', hint: "Ces coups de tuyau rythmiques..." },
      { file: 'sound_04.mp3', answer: 'calinp',   hint: "Cette respiration qui s'emballe..." },
      { file: 'sound_05.mp3', answer: 'plombier', hint: "La perceuse dans le mur..." },
      { file: 'sound_06.mp3', answer: 'calinp',   hint: "Ces gémissements profonds de tendresse..." },
      { file: 'sound_07.mp3', answer: 'plombier', hint: "Le déboucheur — chaque poussée accompagnée d'un grognement..." },
      { file: 'sound_08.mp3', answer: 'calinp',   hint: "Ces souffles passionnés qui s'accélèrent..." },
      { file: 'sound_09.mp3', answer: 'plombier', hint: "La clé à molette — le serrage avec effort..." },
      { file: 'sound_10.mp3', answer: 'calinp',   hint: "Ces murmures doux à deux..." },
      { file: 'sound_11.mp3', answer: 'plombier', hint: "La fuite soudaine — la surprise et la lutte..." },
      { file: 'sound_12.mp3', answer: 'calinp',   hint: "Ces halètements intimes qui montent..." },
      { file: 'sound_13.mp3', answer: 'plombier', hint: "La scie sur le tuyau en cuivre — l'effort rythmique..." },
      { file: 'sound_14.mp3', answer: 'calinp',   hint: "Ces soupirs de satisfaction douce..." },
      { file: 'sound_15.mp3', answer: 'plombier', hint: "'J'arrive !' puis le bruit des outils..." },
      { file: 'sound_16.mp3', answer: 'calinp',   hint: "Ces chuchotements tendres..." },
      { file: 'sound_17.mp3', answer: 'plombier', hint: "Le marteau sur la canalisation derrière le mur..." },
      { file: 'sound_18.mp3', answer: 'calinp',   hint: "Ces vocalises intimes au paroxysme..." },
      { file: 'sound_19.mp3', answer: 'plombier', hint: "Le raccord coincé — l'effort surhumain..." },
      { file: 'sound_20.mp3', answer: 'calinp',   hint: "Ces rires qui virent en soupirs..." },
      { file: 'sound_21.mp3', answer: 'plombier', hint: "Le furet électrique dans la canalisation..." },
      { file: 'sound_22.mp3', answer: 'calinp',   hint: "Ces gémissements profonds partagés..." },
      { file: 'sound_23.mp3', answer: 'plombier', hint: "Le plombier dans le vide sanitaire..." },
      { file: 'sound_24.mp3', answer: 'calinp',   hint: "Ces murmures de complicité..." },
      { file: 'sound_25.mp3', answer: 'plombier', hint: "Les vieilles canalisations qui grincent..." },
      { file: 'sound_26.mp3', answer: 'calinp',   hint: "Ce dernier soupir d'épanouissement..." },
      { file: 'sound_27.mp3', answer: 'plombier', hint: "Le chalumeau sur le raccord en cuivre..." },
      { file: 'sound_28.mp3', answer: 'calinp',   hint: "Cette respiration rythmée douce..." },
      { file: 'sound_29.mp3', answer: 'plombier', hint: "La meuleuse sur le tuyau en fonte..." },
      { file: 'sound_30.mp3', answer: 'calinp',   hint: "Ces murmures chaleureux intimes..." },
      { file: 'sound_31.mp3', answer: 'plombier', hint: "'Voilà ça repart !' — le soupir du réparateur..." },
      { file: 'sound_32.mp3', answer: 'calinp',   hint: "Ces vocalises croissantes et urgentes..." },
      { file: 'sound_33.mp3', answer: 'plombier', hint: "Le marteau-piqueur dans le béton..." },
      { file: 'sound_34.mp3', answer: 'calinp',   hint: "Ces sons chauds et aimants..." },
      { file: 'sound_35.mp3', answer: 'plombier', hint: "La pompe hydraulique — chaque coup de piston..." },
      { file: 'sound_36.mp3', answer: 'calinp',   hint: "Ces sons à peine audibles de tendresse..." },
      { file: 'sound_37.mp3', answer: 'plombier', hint: "La filière à tuyau — le serrage progressif..." },
      { file: 'sound_38.mp3', answer: 'calinp',   hint: "Ces sons doux partagés..." },
      { file: 'sound_39.mp3', answer: 'plombier', hint: "'Oui madame j'arrive !' puis la perceuse..." },
      { file: 'sound_40.mp3', answer: 'calinp',   hint: "Ces souffles intimes rythmés ensemble..." },
      { file: 'sound_41.mp3', answer: 'plombier', hint: "Le cintre de tuyau — le métal qui craque..." },
      { file: 'sound_42.mp3', answer: 'calinp',   hint: "Ces vocalises partagées de plaisir..." },
      { file: 'sound_43.mp3', answer: 'plombier', hint: "Le raccord vissé à la main puis à la clé..." },
      { file: 'sound_44.mp3', answer: 'calinp',   hint: "Ces soupirs post-tendresse comblés..." },
      { file: 'sound_45.mp3', answer: 'plombier', hint: "Le test de pression — l'attente puis le soulagement..." },
      { file: 'sound_46.mp3', answer: 'calinp',   hint: "Ces sons d'amour lents et doux..." },
      { file: 'sound_47.mp3', answer: 'plombier', hint: "Le débouchage de WC à l'auger professionnel..." },
      { file: 'sound_48.mp3', answer: 'calinp',   hint: "Ces désirs chuchotés..." },
      { file: 'sound_49.mp3', answer: 'plombier', hint: "'C'est réparé !' — la fierté sonore..." },
      { file: 'sound_50.mp3', answer: 'calinp',   hint: "Ces derniers soupirs tendres qui s'effacent..." },
    ],
  },
  cuisineChambre: {
    id: 'cuisine-chambre',
    title: 'Cuisine ou Chambre ?',
    emoji: '🍳🛏️',
    subtitle: 'Gastronomie ou galanterie ?',
    optionA: { label: 'Cuisine', emoji: '🍳', key: 'cuisine' as const },
    optionB: { label: 'Chambre', emoji: '🛏️', key: 'chambre3' as const },
    folder: 'cuisine-chambre',
    questions: [
      { file: 'sound_01.mp3', answer: 'cuisine',  hint: "Cette pâte pétrie avec passion et grognements..." },
      { file: 'sound_02.mp3', answer: 'chambre3', hint: "Ces soupirs intimes et doux de chambre..." },
      { file: 'sound_03.mp3', answer: 'cuisine',  hint: "Le batteur électrique qui fouette la crème..." },
      { file: 'sound_04.mp3', answer: 'chambre3', hint: "Cette respiration qui s'emballe dans la chambre..." },
      { file: 'sound_05.mp3', answer: 'cuisine',  hint: "Les huîtres ouvertes à l'effort..." },
      { file: 'sound_06.mp3', answer: 'chambre3', hint: "Ces gémissements profonds de chambre..." },
      { file: 'sound_07.mp3', answer: 'cuisine',  hint: "Le pilon dans le mortier — le rythme implacable..." },
      { file: 'sound_08.mp3', answer: 'chambre3', hint: "Ces halètements passionnés dans la chambre..." },
      { file: 'sound_09.mp3', answer: 'cuisine',  hint: "La viande dans la poêle brûlante — le choc..." },
      { file: 'sound_10.mp3', answer: 'chambre3', hint: "Ces soupirs tendres de chambre à coucher..." },
      { file: 'sound_11.mp3', answer: 'cuisine',  hint: "La pâte à pasta étirée au rouleau — l'effort régulier..." },
      { file: 'sound_12.mp3', answer: 'chambre3', hint: "Ces vocalises intenses de chambre..." },
      { file: 'sound_13.mp3', answer: 'cuisine',  hint: "Le fouet dans le saladier — la cadence qui monte..." },
      { file: 'sound_14.mp3', answer: 'chambre3', hint: "Ces soupirs tendres de contentement intime..." },
      { file: 'sound_15.mp3', answer: 'cuisine',  hint: "La cocotte-minute qui monte en pression..." },
      { file: 'sound_16.mp3', answer: 'chambre3', hint: "Ces vocalises rythmiques de chambre..." },
      { file: 'sound_17.mp3', answer: 'cuisine',  hint: "Le maillet sur le steak — les coups sonores..." },
      { file: 'sound_18.mp3', answer: 'chambre3', hint: "Ces sons profonds de chambre partagée..." },
      { file: 'sound_19.mp3', answer: 'cuisine',  hint: "Le soufflé au four — l'angoisse puis le soulagement..." },
      { file: 'sound_20.mp3', answer: 'chambre3', hint: "Ces vocalises qui culminent dans la chambre..." },
      { file: 'sound_21.mp3', answer: 'cuisine',  hint: "La fondue — le mmmm de la première bouchée chaude..." },
      { file: 'sound_22.mp3', answer: 'chambre3', hint: "Ces soupirs satisfaits de chambre douce..." },
      { file: 'sound_23.mp3', answer: 'cuisine',  hint: "L'ail écrasé — le claquement sec et humide..." },
      { file: 'sound_24.mp3', answer: 'chambre3', hint: "Ces murmures post-intimité comblés..." },
      { file: 'sound_25.mp3', answer: 'cuisine',  hint: "La crème brûlée au chalumeau — le crépitement sensuel..." },
      { file: 'sound_26.mp3', answer: 'chambre3', hint: "Ces vocalises urgentes de chambre..." },
      { file: 'sound_27.mp3', answer: 'cuisine',  hint: "Le pain chaud déchiré — la vapeur et le gémissement..." },
      { file: 'sound_28.mp3', answer: 'chambre3', hint: "Ces gémissements tendres de chambre..." },
      { file: 'sound_29.mp3', answer: 'cuisine',  hint: "Le blender à plein régime — puis le soulagement..." },
      { file: 'sound_30.mp3', answer: 'chambre3', hint: "Ces sons passionnés au sommet de la chambre..." },
      { file: 'sound_31.mp3', answer: 'cuisine',  hint: "Le chocolat fondu — le mmmm du chef..." },
      { file: 'sound_32.mp3', answer: 'chambre3', hint: "Ces soupirs doux de chambre chaude..." },
      { file: 'sound_33.mp3', answer: 'cuisine',  hint: "Le champagne débouché — la surprise et le plaisir..." },
      { file: 'sound_34.mp3', answer: 'chambre3', hint: "Ces vocalises rythmiques libérées de chambre..." },
      { file: 'sound_35.mp3', answer: 'cuisine',  hint: "La truffe râpée — le moan gastronomique profond..." },
      { file: 'sound_36.mp3', answer: 'chambre3', hint: "Ces sons intimes chaleureux de chambre..." },
      { file: 'sound_37.mp3', answer: 'cuisine',  hint: "La tarte Tatin démoulée — l'angoisse et le triomphe..." },
      { file: 'sound_38.mp3', answer: 'chambre3', hint: "Ces vocalises qui culminent passionnément..." },
      { file: 'sound_39.mp3', answer: 'cuisine',  hint: "Le risotto 20 minutes — l'épuisement satisfait..." },
      { file: 'sound_40.mp3', answer: 'chambre3', hint: "Ces soupirs d'après chambre comblés..." },
      { file: 'sound_41.mp3', answer: 'cuisine',  hint: "Le steak claqué sur la plancha brûlante..." },
      { file: 'sound_42.mp3', answer: 'chambre3', hint: "Ces gémissements profonds et tendres de chambre..." },
      { file: 'sound_43.mp3', answer: 'cuisine',  hint: "Les macarons garnis à la poche à douille..." },
      { file: 'sound_44.mp3', answer: 'chambre3', hint: "Ces sons d'après chambre qui s'apaisent..." },
      { file: 'sound_45.mp3', answer: 'cuisine',  hint: "La sauce chocolat versée lentement — le moan du chef..." },
      { file: 'sound_46.mp3', answer: 'chambre3', hint: "Ces vocalises urgentes et partagées de chambre..." },
      { file: 'sound_47.mp3', answer: 'cuisine',  hint: "Le croissant croqué — le feuilletage et le soupir..." },
      { file: 'sound_48.mp3', answer: 'chambre3', hint: "Ces soupirs à peine audibles de chambre douce..." },
      { file: 'sound_49.mp3', answer: 'cuisine',  hint: "La fondue partagée — les rires et les soupirs..." },
      { file: 'sound_50.mp3', answer: 'chambre3', hint: "Ce long soupir final de chambre comblée..." },
    ],
  },
};

const MESSAGES = {
  chatBebe: {
    correctA: [
      "Bien joué ! C'était bien un chat 🐱",
      "Vos oreilles sont fines !",
      "Félin identifié avec succès ! 🐾"
    ],
    correctB: [
      "Bravo ! Ce bébé ne vous a pas eu 👶",
      "Impressionnant !",
      "L'instinct parental ne trompe pas !"
    ],
    wrongThoughtA: [
      "Raté ! Ce bébé a l'âme d'un chat",
      "Il fallait adopter ce bébé, pas l'appeler félin !",
      "C'était un humain ! Dommage 😂"
    ],
    wrongThoughtB: [
      "Piégé(e) ! Ce chat pleure comme un bébé 😂",
      "Ce matou mérite un Oscar !",
      "Un vrai manipulateur ce chat !"
    ]
  },
  ronflementMoteur: {
    correctA: [
      "Bien joué ! C'était du ronflement humain 😴", 
      "Vos oreilles percent les murs !"
    ],
    correctB: [
      "Exact ! C'était un vrai moteur 🔧", 
      "Vous êtes un(e) mécano de l'oreille !"
    ],
    wrongThoughtA: [
      "Raté ! Ce moteur ronflait comme un humain 😂", 
      "Cette machine devrait consulter un médecin du sommeil !"
    ],
    wrongThoughtB: [
      "Piégé(e) ! Ce ronflement était digne d'un moteur 😂", 
      "Cet humain devrait faire réviser ses voies respiratoires !"
    ]
  },
  sportCalin: {
    correctA: [
      "C'était bien du sport ! Vos oreilles ne mentent pas 🏋️",
      "Champion(ne) ! Ce gémissement était clairement de l'effort !"
    ],
    correctB: [
      "Bien vu ! Ce câlin ne vous a pas trompé(e) 💕",
      "Vous avez l'oreille fine pour les tendresses !"
    ],
    wrongThoughtA: [
      "Raté ! Ce n'était pas de la gym 😏",
      "Ce n'était pas de l'haltérophilie... mais presque aussi intense 😂"
    ],
    wrongThoughtB: [
      "Piégé(e) ! C'était bien du sport 😂",
      "Ces athlètes mériteraient un Oscar du gémissement !"
    ]
  },
  massageGalipette: {
    correctA: [
      "C'était du massage ! Vos oreilles voient clair 💆",
      "Bravo ! Ce praticien est innocent !"
    ],
    correctB: [
      "Bien vu ! Ce n'était pas thérapeutique 🙈",
      "L'oreille exercée ne trompe pas !"
    ],
    wrongThoughtA: [
      "Raté ! Ce n'était pas une thérapie 😏",
      "Ce kinésithérapeute va avoir une surprise..."
    ],
    wrongThoughtB: [
      "Piégé(e) ! C'était purement médical 😂",
      "Ce masseur mérite une plainte pour ambiguïté sonore !"
    ]
  },
  dentisteAmants: {
    correctA: [
      "C'était bien le dentiste ! Courage 🦷",
      "Vos oreilles reconnaissent la douleur !"
    ],
    correctB: [
      "C'était bien des amants 😏",
      "Vos oreilles ne mentent pas !"
    ],
    wrongThoughtA: [
      "Ce n'était pas médical... 😂",
      "Ce dentiste aurait des comptes à rendre !"
    ],
    wrongThoughtB: [
      "Piégé(e) ! C'était le dentiste 🦷",
      "Ce cabinet dentaire mérite une enquête !"
    ]
  },
  horreurChambre: {
    correctA: [
      "C'était un film d'horreur ! Courageux(se) 😱",
      "Vos oreilles distinguent la terreur !"
    ],
    correctB: [
      "C'était la chambre ! Bien vu 🛏️",
      "Rien ne vous échappe !"
    ],
    wrongThoughtA: [
      "Ce n'était pas effrayant... enfin ça dépend 😂",
      "Ce film d'horreur serait plutôt classé autrement !"
    ],
    wrongThoughtB: [
      "Piégé(e) ! C'était un film d'horreur 😱",
      "Vous regardez des films d'horreur bizarres !"
    ]
  },
  accouchementExtase: {
    correctA: [
      "C'était bien un accouchement ! Respect 🤰",
      "Vos oreilles reconnaissent le miracle de la vie !"
    ],
    correctB: [
      "C'était de l'extase ! Bien vu 🔥",
      "Ces sons ne trompent pas les oreilles avisées !"
    ],
    wrongThoughtA: [
      "Ce n'était pas une salle d'accouchement 😂",
      "Ce gynécologue va avoir des questions..."
    ],
    wrongThoughtB: [
      "Piégé(e) ! C'était un accouchement 🤰",
      "Ces deux événements ont décidément trop en commun !"
    ]
  },
  hammamChambre: {
    correctA: [
      "C'était bien le hammam ! Ça détend 🧖",
      "Vos oreilles distinguent la vapeur du reste !"
    ],
    correctB: [
      "C'était la chambre ! Bien entendu 🛏️",
      "Rien ne vous échappe !"
    ],
    wrongThoughtA: [
      "Ce n'était pas thérapeutique... 😂",
      "Ce hammam proposerait des services inédits !"
    ],
    wrongThoughtB: [
      "Piégé(e) ! C'était un hammam 🧖",
      "Ce hammam mérite 5 étoiles pour l'ambiance !"
    ]
  },
  plombierCalin: {
    correctA: ["C'était bien le plombier ! Pas de fuite 🔧", "Vos oreilles reconnaissent le travail bien fait !"],
    correctB: ["C'était un câlin ! Bien vu 💕", "Ces sons de tendresse ne vous trompent pas !"],
    wrongThoughtA: ["Ce n'était pas des travaux... 😂", "Ce plombier a d'autres talents !"],
    wrongThoughtB: ["Piégé(e) ! C'était le plombier 🔧", "Ce plombier mérite un oscar du gémissement !"]
  },
  cuisineChambre: {
    correctA: ["C'était la cuisine ! Vos oreilles savent cuisiner 🍳", "Gordon Ramsay approuve vos oreilles !"],
    correctB: ["C'était la chambre ! Bien vu 🛏️", "Ces sons ne trompent pas les oreilles avisées !"],
    wrongThoughtA: ["Ce n'était pas gastronomique... 😂", "Ce chef étoilé a un style particulier !"],
    wrongThoughtB: ["Piégé(e) ! C'était la cuisine 🍳", "Ce plat mérite un Michelin pour l'ambiance sonore !"]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

type AppState = 'menu' | 'config' | 'playing' | 'revealed' | 'end';
type CategoryKey = keyof typeof CATEGORIES;

function App() {
  const [appState, setAppState] = useState<AppState>('menu');
  const [selectedCatKey, setSelectedCatKey] = useState<CategoryKey>('chatBebe');
  const [soundCount, setSoundCount] = useState(10);

  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastGuess, setLastGuess] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startGame = () => {
    const catQuestions = CATEGORIES[selectedCatKey].questions;
    const shuffled = shuffleArray(catQuestions).slice(0, soundCount);
    setShuffledQuestions(shuffled);
    setScore(0);
    setCurrentRound(0);
    setAppState('playing');
    setLastGuess(null);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const playAudio = () => {
    stopAudio();
    const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
    const category = CATEGORIES[selectedCatKey];
    const currentQ = shuffledQuestions[currentRound];
    const audio = new Audio(`${BASE}/sounds/${category.folder}/${currentQ.file}`);
    
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => {
      console.error("Audio playback failed");
      setIsPlaying(false);
    };
    
    audioRef.current = audio;
    
    audio.play().catch(e => {
      console.error(e);
      setIsPlaying(false);
    });
    setIsPlaying(true);
  };

  useEffect(() => {
    return () => stopAudio();
  }, [appState, currentRound]);

  const handleGuess = (guess: string) => {
    stopAudio();
    setLastGuess(guess);
    const currentQ = shuffledQuestions[currentRound];
    if (guess === currentQ.answer) {
      setScore(s => s + 1);
    }
    setAppState('revealed');
  };

  const nextRound = () => {
    if (currentRound < soundCount - 1) {
      setCurrentRound(r => r + 1);
      setAppState('playing');
      setLastGuess(null);
    } else {
      setAppState('end');
    }
  };

  const getScoreMessage = (score: number, total: number) => {
    const pct = score / total;
    if (pct >= 0.9) return "Parfait ! Vous maîtrisez l'art de l'écoute 👑";
    if (pct >= 0.7) return "Très bien ! Vos oreilles valent de l'or 🥇";
    if (pct >= 0.5) return "Pas mal ! Mais vous pouvez faire mieux 😅";
    return "Catastrophique ! Il va falloir s'entraîner un peu 😂";
  };

  const getRandomMessage = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const getRevealMessage = () => {
    const currentQ = shuffledQuestions[currentRound];
    const isCorrect = lastGuess === currentQ.answer;
    const catMessages = MESSAGES[selectedCatKey];
    const category = CATEGORIES[selectedCatKey];
    
    if (isCorrect) {
      return currentQ.answer === category.optionA.key 
        ? getRandomMessage(catMessages.correctA)
        : getRandomMessage(catMessages.correctB);
    } else {
      return currentQ.answer === category.optionA.key
        ? getRandomMessage(catMessages.wrongThoughtB)
        : getRandomMessage(catMessages.wrongThoughtA);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <AnimatePresence mode="wait">
        
        {/* MAIN MENU */}
        {appState === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="flex flex-col items-center max-w-6xl w-full gap-12"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-3xl bg-[#FF3C00] shadow-lg" aria-hidden="true">
                  <svg width="32" height="32" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-10">
                    <rect width="180" height="180" rx="36" fill="#FF3C00"/>
                    <path d="M55 95 C55 62 73 45 90 45 C107 45 125 62 125 95" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round"/>
                    <rect x="50" y="88" width="28" height="42" rx="10" fill="white"/>
                    <rect x="102" y="88" width="28" height="42" rx="10" fill="white"/>
                    <path d="M90 48 L90 38" stroke="white" strokeWidth="10" strokeLinecap="round"/>
                  </svg>
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-foreground">
                  Quel est<br/>ce son ?
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Choisissez votre défi auditif.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
              {(Object.entries(CATEGORIES) as [CategoryKey, typeof CATEGORIES[CategoryKey]][]).map(([key, cat]) => (
                <button
                  key={key}
                  onClick={() => { setSelectedCatKey(key); setAppState('config'); }}
                  className={`relative p-8 rounded-[2.5rem] bubbly-shadow transition-all group flex flex-col items-center gap-4 ${
                    key === 'chatBebe' ? 'bg-secondary text-secondary-foreground' : 
                    key === 'ronflementMoteur' ? 'bg-primary text-primary-foreground' : 
                    key === 'sportCalin' ? 'bg-[#ff4500] text-white' : 
                    key === 'massageGalipette' ? 'bg-[#673ab7] text-white' : 
                    key === 'dentisteAmants' ? 'bg-[#0f766e] text-white' : 
                    'bg-[#e11d48] text-white'
                  }`}
                >
                  <div className="text-7xl md:text-8xl group-hover:scale-110 transition-transform duration-300 ease-out mb-2">
                    {cat.emoji}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold">{cat.title}</h2>
                  <p className="text-lg md:text-xl opacity-90">{cat.subtitle}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* CONFIG SCREEN */}
        {appState === 'config' && (
          <motion.div 
            key="config"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="bg-card text-card-foreground border-4 border-card-border p-8 md:p-12 rounded-[3rem] w-full max-w-md flex flex-col items-center gap-10 shadow-xl"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="text-6xl mb-2">{CATEGORIES[selectedCatKey].emoji}</div>
              <h2 className="text-3xl md:text-4xl font-bold">{CATEGORIES[selectedCatKey].title}</h2>
            </div>
            
            <div className="w-full flex flex-col gap-6 items-center bg-background/50 p-6 rounded-3xl border-2 border-border">
              <label className="text-lg font-bold text-muted-foreground uppercase tracking-widest">Combien de sons ?</label>
              <div className="text-7xl font-black text-primary drop-shadow-sm">{soundCount}</div>
              
              <div className="w-full mt-2">
                <input 
                  type="range" 
                  min={5} max={50} step={5}
                  value={soundCount}
                  onChange={(e) => setSoundCount(Number(e.target.value))}
                  className="w-full h-4 bg-muted rounded-full appearance-none cursor-pointer accent-primary outline-none focus:ring-4 focus:ring-primary/20"
                />
                <div className="flex justify-between w-full text-muted-foreground font-bold mt-3 text-lg">
                  <span>5</span>
                  <span>50</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-4 mt-2">
              <button 
                onClick={startGame}
                className="bg-foreground text-background text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full flex items-center justify-center gap-3 hover:opacity-90"
              >
                <Play size={28} className="fill-current" />
                Jouer !
              </button>
              <button 
                onClick={() => setAppState('menu')}
                className="text-muted-foreground font-bold text-xl py-4 hover:text-foreground transition-colors"
              >
                Retour au menu
              </button>
            </div>
          </motion.div>
        )}

        {/* PLAYING SCREEN */}
        {appState === 'playing' && (() => {
          const category = CATEGORIES[selectedCatKey];
          return (
            <motion.div 
              key="playing"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex flex-col items-center max-w-md w-full h-full justify-between py-8 gap-8"
            >
              <div className="w-full flex justify-between items-center px-4">
                <div className="bg-muted px-5 py-2.5 rounded-full font-bold text-muted-foreground text-lg border-2 border-border">
                  Tour {currentRound + 1}/{soundCount}
                </div>
                <div className="bg-accent text-accent-foreground px-5 py-2.5 rounded-full font-bold text-lg shadow-sm">
                  Score: {score}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center w-full gap-12 my-8">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={isPlaying ? stopAudio : playAudio}
                  className="w-56 h-56 rounded-full bg-foreground text-background flex items-center justify-center relative shadow-xl overflow-hidden group border-4 border-foreground/10"
                >
                  {isPlaying && (
                    <motion.div 
                      className="absolute inset-0 bg-primary/20"
                      animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    {isPlaying ? (
                      <div className="flex items-center gap-1.5 h-16">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2.5 bg-current rounded-full"
                            animate={{ height: ["20%", "100%", "20%"] }}
                            transition={{
                              repeat: Infinity,
                              duration: 0.8,
                              delay: i * 0.1,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <Play size={64} className="fill-current translate-x-2" />
                    )}
                    <span className="text-xl font-bold mt-2">
                      {isPlaying ? 'Arrêter' : 'Écouter le son'}
                    </span>
                  </div>
                </motion.button>
              </div>

              <div className="w-full grid grid-cols-2 gap-4 px-4">
                <button 
                  onClick={() => handleGuess(category.optionA.key)}
                  className="bg-secondary text-secondary-foreground text-xl md:text-2xl font-bold p-6 md:p-8 rounded-[2rem] bubbly-shadow transition-all flex flex-col items-center gap-3 hover:brightness-110"
                >
                  <span className="text-5xl md:text-6xl mb-1">{category.optionA.emoji}</span>
                  <span>{category.optionA.label}</span>
                </button>
                
                <button 
                  onClick={() => handleGuess(category.optionB.key)}
                  className="bg-primary text-primary-foreground text-xl md:text-2xl font-bold p-6 md:p-8 rounded-[2rem] bubbly-shadow transition-all flex flex-col items-center gap-3 hover:brightness-110"
                >
                  <span className="text-5xl md:text-6xl mb-1">{category.optionB.emoji}</span>
                  <span>{category.optionB.label}</span>
                </button>
              </div>
            </motion.div>
          );
        })()}

        {/* REVEAL SCREEN */}
        {appState === 'revealed' && (() => {
          const category = CATEGORIES[selectedCatKey];
          const currentQ = shuffledQuestions[currentRound];
          const isCorrect = lastGuess === currentQ.answer;
          
          return (
            <motion.div 
              key="revealed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isCorrect ? 
                { opacity: 1, scale: 1 } : 
                { opacity: 1, scale: 1, x: [-10, 10, -10, 10, 0] }
              }
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center max-w-md w-full gap-8 px-4"
            >
              {isCorrect && <Confetti />}

              <motion.div 
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                className={`w-40 h-40 rounded-full flex items-center justify-center text-7xl shadow-2xl border-4 ${
                  isCorrect ? 'bg-green-400 border-green-300' : 'bg-red-400 border-red-300'
                }`}
              >
                {isCorrect ? '✅' : '❌'}
              </motion.div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  C'était {currentQ.answer === category.optionA.key 
                    ? `un ${category.optionA.label} ${category.optionA.emoji}` 
                    : `un ${category.optionB.label} ${category.optionB.emoji}`} !
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
                  {getRevealMessage()}
                </p>
                
                <div className="bg-card border-4 border-card-border p-8 rounded-[2rem] shadow-sm relative mt-8">
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-card px-6 py-2 text-sm font-bold uppercase tracking-widest rounded-full border-4 border-card-border text-muted-foreground">
                    L'indice
                  </span>
                  <p className="italic text-xl text-foreground font-medium">
                    "{currentQ.hint}"
                  </p>
                </div>
              </div>

              <button 
                onClick={nextRound}
                className="mt-4 bg-foreground text-background text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full hover:opacity-90"
              >
                {currentRound < soundCount - 1 ? 'Son suivant' : 'Voir les résultats'}
              </button>
            </motion.div>
          );
        })()}

        {/* END SCREEN */}
        {appState === 'end' && (() => {
          const ratio = score / soundCount;
          return (
            <motion.div 
              key="end"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center max-w-md w-full gap-10 px-4 py-8"
            >
              {ratio >= 0.5 && <Confetti duration={5000} />}
              
              <h1 className="text-5xl font-bold tracking-tight">Résultat final</h1>
              
              <div className="relative mt-4">
                <svg className="w-56 h-56 transform -rotate-90 drop-shadow-xl">
                  <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-muted" />
                  <motion.circle 
                    cx="112" cy="112" r="100" 
                    stroke="currentColor" 
                    strokeWidth="20" 
                    fill="transparent"
                    className={ratio >= 0.7 ? 'text-green-500' : ratio >= 0.5 ? 'text-accent' : 'text-destructive'}
                    strokeDasharray="628.31"
                    initial={{ strokeDashoffset: 628.31 }}
                    animate={{ strokeDashoffset: 628.31 - (628.31 * ratio) }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black text-foreground tracking-tighter">{score}</span>
                  <span className="text-2xl font-bold text-muted-foreground border-t-4 border-muted-foreground/20 pt-1 mt-1">/ {soundCount}</span>
                </div>
              </div>

              <p className="text-2xl md:text-3xl font-bold px-4 leading-tight">
                {getScoreMessage(score, soundCount)}
              </p>

              <div className="flex flex-col w-full gap-4 mt-6">
                <button 
                  onClick={startGame}
                  className="flex items-center justify-center gap-3 bg-primary text-primary-foreground text-2xl font-bold px-12 py-6 rounded-[2rem] bubbly-shadow transition-all w-full hover:brightness-110"
                >
                  <RefreshCcw size={28} />
                  Rejouer
                </button>
                <button 
                  onClick={() => setAppState('menu')}
                  className="flex items-center justify-center gap-3 bg-card border-4 border-card-border text-card-foreground text-xl font-bold px-12 py-5 rounded-[2rem] bubbly-shadow transition-all w-full hover:bg-muted"
                >
                  <Home size={24} />
                  Menu principal
                </button>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export default App;
