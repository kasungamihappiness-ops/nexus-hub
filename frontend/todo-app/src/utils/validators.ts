/**
 * Validate todo title
 */
export const validateTitle = (title: string): { valid: boolean; error?: string } => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' };
  }
  if (title.length > 200) {
    return { valid: false, error: 'Title must be less than 200 characters' };
  }
  return { valid: true };
};

/**
 * Validate description
 */
export const validateDescription = (description?: string): { valid: boolean; error?: string } => {
  if (description && description.length > 1000) {
    return { valid: false, error: 'Description must be less than 1000 characters' };
  }
  return { valid: true };
};

/**
 * Validate due date
 */
export const validateDueDate = (dueDate?: string): { valid: boolean; error?: string } => {
  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      return { valid: false, error: 'Invalid date format' };
    }
  }
  return { valid: true };
};

/**
 * Validate category
 */
export const validateCategory = (category: string): { valid: boolean; error?: string } => {
  if (!category || category.trim().length === 0) {
    return { valid: false, error: 'Category is required' };
  }
  return { valid: true };
};

/**
 * Validate priority
 */
export const validatePriority = (priority: string): { valid: boolean; error?: string } => {
  const validPriorities = ['high', 'medium', 'low'];
  if (!validPriorities.includes(priority)) {
    return { valid: false, error: 'Invalid priority level' };
  }
  return { valid: true };
};

/**
 * Validate complete todo
 */
export const validateTodo = (title: string, category: string, priority: string, description?: string, dueDate?: string) => {
  const titleValidation = validateTitle(title);
  if (!titleValidation.valid) return titleValidation;

  const categoryValidation = validateCategory(category);
  if (!categoryValidation.valid) return categoryValidation;

  const priorityValidation = validatePriority(priority);
  if (!priorityValidation.valid) return priorityValidation;

  const descriptionValidation = validateDescription(description);
  if (!descriptionValidation.valid) return descriptionValidation;

  const dueDateValidation = validateDueDate(dueDate);
  if (!dueDateValidation.valid) return dueDateValidation;

  return { valid: true };
};
