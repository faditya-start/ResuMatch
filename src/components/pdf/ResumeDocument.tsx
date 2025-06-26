// src/components/pdf/ResumeDocument.tsx
import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  bullet: {
    marginBottom: 6,
    fontSize: 12,
  },
});

interface ResumeDocumentProps {
  bullets: string[];
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ bullets }) => (
  <Document>
    <Page style={styles.body}>
      {bullets.map((bullet, index) => (
        <Text key={index} style={styles.bullet}>
          • {bullet}
        </Text>
      ))}
    </Page>
  </Document>
);
