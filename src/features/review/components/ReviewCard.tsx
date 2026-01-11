import React from 'react';
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { Divider } from 'react-native-paper';

import ReviewSpeechCard from './ReviewSpeechCard';
import ExampleCard from './ExampleCard';

import AccordionArrow from '@shared/components/Accordion/AccordionArrow';
import { Text } from '@shared/components/ui/ThemedText';
import AccordionSimple from '@shared/components/AccordionSimple';
import { Example } from '@shared/store/useCardsStore';

interface ReviewCardProps {
  fontSize: number | undefined;
  text: string;
  language: string | undefined;
  examples: Example[];
  sideType: 'front' | 'back';
  showSoundButton?: boolean;
  arrowStyle?: StyleProp<ViewStyle>;
  soundStyle?: StyleProp<ViewStyle>;
}

export default function ReviewCard({
  fontSize,
  text,
  language,
  examples,
  sideType,
  showSoundButton = true,
  arrowStyle,
  soundStyle,
}: ReviewCardProps) {
  const isExpanded = useSharedValue(false);

  const onExpand = () => {
    isExpanded.value = !isExpanded.value;
  };

  return (
    <>
      <View style={{ width: '100%' }}>
        <Text onPress={onExpand} style={[styles.text, { fontSize }]}>
          {text}
        </Text>
        <AccordionSimple open={isExpanded}>
          <FlatList
            data={examples}
            keyExtractor={(item, idx) => `${item.id ?? idx}`}
            renderItem={({ item: example, index }) => (
              <ExampleCard
                index={index}
                example={example}
                textFontSize={fontSize}
                sideType={sideType}
              />
            )}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => <Divider style={{ margin: 4 }} />}
          />
        </AccordionSimple>
      </View>
      <AccordionArrow
        isVisible={Boolean(examples?.length)}
        isExpanded={isExpanded}
        onClick={onExpand}
        style={[styles.arrow, arrowStyle]}
      />
      {showSoundButton && (
        <ReviewSpeechCard
          key={`${text}_${language}`}
          type={sideType}
          text={text}
          style={soundStyle}
          // style={styles.soundButtonBottom}
          languageCode={language}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  arrow: {
    left: 0,
    padding: 4,
    position: 'absolute',
    right: 'auto',
    top: 0,
    zIndex: 2,
  },
  listContainer: {
    paddingVertical: 16,
  },

  text: {
    textAlign: 'center',
    width: '100%',
  },
});
