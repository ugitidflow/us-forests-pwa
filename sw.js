{\rtf1\ansi\ansicpg1251\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 self.addEventListener("install", (event) => \{\
  console.log("Service Worker installed");\
\});\
\
self.addEventListener("activate", (event) => \{\
  console.log("Service Worker activated");\
\});\
\
// \uc0\u1055 \u1086 \u1082 \u1072  \u1087 \u1088 \u1086 \u1089 \u1090 \u1086  \u1087 \u1088 \u1086 \u1082 \u1080 \u1076 \u1099 \u1074 \u1072 \u1077 \u1084  \u1074 \u1089 \u1077  \u1079 \u1072 \u1087 \u1088 \u1086 \u1089 \u1099  \u1076 \u1072 \u1083 \u1100 \u1096 \u1077  \u1074  \u1089 \u1077 \u1090 \u1100 \
self.addEventListener("fetch", (event) => \{\
  // \uc0\u1052 \u1086 \u1078 \u1085 \u1086  \u1073 \u1091 \u1076 \u1077 \u1090  \u1076 \u1086 \u1073 \u1072 \u1074 \u1080 \u1090 \u1100  \u1082 \u1101 \u1096 \u1080 \u1088 \u1086 \u1074 \u1072 \u1085 \u1080 \u1077 \
\});\
}