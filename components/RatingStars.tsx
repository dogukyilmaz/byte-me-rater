import { getStarRatings, ratingColorPicker } from '../utils';
import { Ionicons } from '@expo/vector-icons';
import { HStack, Text } from 'native-base';

type RatingStarsProps = {
  rating: number;
  color?: string;
  size?: number;
  showRating?: boolean;
};

const RatingStars = ({ rating, color, size = 14, showRating = false }: RatingStarsProps) => {
  const stars = getStarRatings(rating);

  return (
    <HStack alignItems='center'>
      {stars.map((star, index) => (
        <Ionicons
          key={index}
          name={
            star === 'full' ? 'ios-star' : star === 'half' ? 'ios-star-half' : 'ios-star-outline'
          }
          size={size}
          color={color || ratingColorPicker(rating)}
        />
      ))}
      {showRating && (
        <Text ml='2' fontSize={size * 0.8} color='gray.400'>
          {rating || 0}/5
        </Text>
      )}
    </HStack>
  );
};

export default RatingStars;
